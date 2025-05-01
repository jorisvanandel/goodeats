import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { EngagementType } from '@/types/enums';
import { Restaurant } from '@/types/resources';
import { useForm } from '@inertiajs/react';
import { StarIcon } from 'lucide-react';
import { FormEvent } from 'react';
import { toast } from 'sonner';

type AddVisitEngagementDrawerProps = React.ComponentProps<typeof Drawer> & { restaurant: Restaurant };

function AddVisitEngagementDrawer({ onOpenChange, restaurant, ...props }: AddVisitEngagementDrawerProps) {
    const { data, setData, errors, post, reset } = useForm<{
        rating: number;
    }>({
        rating: 0,
    });

    function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        post(route('engagements.store', { restaurant_id: restaurant.id, type: EngagementType.Visit }), {
            onSuccess: () => {
                if (onOpenChange !== undefined) {
                    onOpenChange(false);
                }

                reset();
                toast.success('Je ervaring met dit restaurant is opgeslagen!');
            },
        });
    }

    return (
        <Drawer {...props} onOpenChange={onOpenChange}>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Ik ben hier geweest!</DrawerTitle>
                    <DrawerDescription>Geef met een cijfer aan wat je er van vond.</DrawerDescription>
                </DrawerHeader>
                <div className="px-4">
                    <form id="add-visit-form" onSubmit={handleOnSubmit}>
                        <RadioGroup onValueChange={(value) => setData('rating', Number(value))}>
                            <div className="mx-auto flex gap-2">
                                {[2, 4, 6, 8, 10].map((rating, ratingIdx) => (
                                    <div key={ratingIdx}>
                                        <RadioGroupItem hidden value={String(rating)} id={`rating-${rating}`} />
                                        <Button type="button" variant="outline" asChild>
                                            <Label htmlFor={`rating-${rating}`}>
                                                <StarIcon
                                                    className={cn(
                                                        'size-6',
                                                        data.rating >= rating ? 'fill-yellow-500 stroke-yellow-500' : 'text-muted-foreground',
                                                    )}
                                                />
                                            </Label>
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </RadioGroup>
                        <InputError message={errors.rating} />
                    </form>
                </div>
                <DrawerFooter>
                    <Button type="submit" form="add-visit-form">
                        Feedback delen
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}

export { AddVisitEngagementDrawer };

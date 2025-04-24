import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { TextHeading, TextParagraph } from '@/components/ui/text';
import { Restaurant } from '@/types/resources';
import { Link } from '@inertiajs/react';

type RestaurantCardProps = {
    restaurant: Restaurant;
};

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
    return (
        <Link href={route('restaurants.show', restaurant.id)}>
            <Card className="gap-0 overflow-hidden p-0">
                <Carousel>
                    <CarouselContent>
                        {restaurant.images.map((image, imageIdx) => (
                            <CarouselItem key={imageIdx}>
                                <img alt={restaurant.name} className="h-40 w-full object-cover" src={image.preview_url} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
                <CardContent className="py-2.5">
                    <TextHeading>{restaurant.name}</TextHeading>
                    <TextParagraph variant="muted">{restaurant.address}</TextParagraph>
                </CardContent>
            </Card>
        </Link>
    );
}

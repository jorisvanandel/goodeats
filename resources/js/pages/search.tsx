import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { TextHeading, TextParagraph } from '@/components/ui/text';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { Link } from '@inertiajs/react';
import { SearchIcon } from 'lucide-react';
import { useState } from 'react';
import { Restaurant } from '@/types/resources';
import { PaginatedCollection } from '@/types/pagination';

type SearchPageProps = {
    restaurants: PaginatedCollection<Restaurant>;
}
export default function SearchPage({ restaurants }: SearchPageProps) {
    const [loading, setLoading] = useState<boolean>(true);

    // @TODO: Replace this POC with an actual loading state
    setTimeout(() => setLoading(false), 500);

    return (
        <AuthenticatedLayout>
            <div className="relative">
                <SearchIcon className="text-muted-foreground absolute inset-y-0 ml-3 size-5.5 h-full" />
                <Input className="pl-11" placeholder="Zoek hier naar je favoriete restaurant..." />
            </div>
            <div className="mt-5 grid gap-y-3">
                {restaurants.data.map((restaurant, restaurantIdx) => {
                    return loading ? (
                        <Skeleton key={restaurantIdx} className="h-32" />
                    ) : (
                        <Link key={restaurantIdx} href={route('restaurants.show', restaurant.id)}>
                            <Card className="gap-0 overflow-hidden p-0">
                                <Carousel>
                                    <CarouselContent>
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <CarouselItem key={index}>
                                                <img
                                                    alt={restaurant.name}
                                                    className="h-40 w-full object-cover"
                                                    src="https://scontent.frtm1-1.fna.fbcdn.net/v/t39.30808-6/484913549_1184638113663160_3905320551823377024_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=XTis-n9_ZuIQ7kNvwHxe6Mm&_nc_oc=AdmELph6ElgUIKYfOYqbWQG1YnNlGnMUAYNRiH14a50vUw8TY0c66DPXbaRn-4HtItY&_nc_zt=23&_nc_ht=scontent.frtm1-1.fna&_nc_gid=iPPFqUGy_iQAIgCjk7Emxw&oh=00_AfHUC-dJiosnUF4mbxsY-0SyfivzEtk7QXj6zSu6VcNA5A&oe=67FED828"
                                                />
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
                })}
            </div>
        </AuthenticatedLayout>
    );
}

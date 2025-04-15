import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { TextHeading, TextParagraph } from '@/components/ui/text';
import { Link } from '@inertiajs/react';
import React from 'react';
import { Restaurant } from '@/types/resources';

type RestaurantCardProps = {
    restaurant: Restaurant;
}

export function RestaurantCard({ restaurant } : RestaurantCardProps) {
    return (
        <Link href={route('restaurants.show', restaurant.id)}>
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
    )
}

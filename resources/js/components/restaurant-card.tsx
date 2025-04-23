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
                        {Array.from({ length: 5 }).map((_, index) => (
                            <CarouselItem key={index}>
                                <img
                                    alt={restaurant.name}
                                    className="h-40 w-full object-cover"
                                    src="https://scontent.frtm1-1.fna.fbcdn.net/v/t39.30808-6/484913549_1184638113663160_3905320551823377024_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=VTeinwe61q4Q7kNvwEtKVS7&_nc_oc=Adm3sfc3oM8h679l3E3Q_0Dz4S93--4LUXeidaWDkkNqH-HOxUJsEmbEPOvOoRHB7Iw&_nc_zt=23&_nc_ht=scontent.frtm1-1.fna&_nc_gid=8-ILENm5bEkecj2vFFV91w&oh=00_AfFR0q4M1MSDAHfudI9AfvWNzmHKWsfjGHbhW09BPml_YQ&oe=680EE268"
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
}

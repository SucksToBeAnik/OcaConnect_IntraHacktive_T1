"use client";
import { useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoscroll from "embla-carousel-auto-scroll";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"

  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"


import { Button } from "@/components/ui/button"
import Autoplay from "embla-carousel-autoplay"


const ClubCarousel = () => {
  const clubs = [
    {
      title: 'Robotics Club',
      description: 'Achieve your imagination through your robot"—the vision of the high-functioning sociopaths of ROBU!',
      image: "https://scontent.fdac14-1.fna.fbcdn.net/v/t39.30808-6/454583912_924040296432115_2330241839340836342_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFRr9NlLIP-wnnTAs6q0Pe1kzlE6JdrxdyTOUTol2vF3Gx9D2EaSbVJ26E4V2-rhdFKrGS53es7qxTEParj7TWF&_nc_ohc=7KdIpjOSRB4Q7kNvgG6BZle&_nc_zt=23&_nc_ht=scontent.fdac14-1.fna&_nc_gid=A0Bc-NlaU_iLSUwJCmtDbiW&oh=00_AYBxLy9O27i9a7h1WmZ9lfaR5LjasBSLqGDYfpbNnx9IhQ&oe=6734B3EE",
      fbUrl: 'https://www.facebook.com/BRACU.Robotics.Club',
    },
    {
      title: 'Computer Club (BUCC) ',
      description: 'A community for tech enthusiasts from BRAC University.',
      image: 'https://scontent.fdac14-1.fna.fbcdn.net/v/t39.30808-6/454714445_1301795811019264_6199518978663177987_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFLPsl2h--00XTUZttoXCtRFjbhbOX9o6EWNuFs5f2joQw8uEQDvlH_60Hz6-gZKu3-icTfvgdiqOL3Mb4uuUea&_nc_ohc=7v_whLgV7E4Q7kNvgHvRARD&_nc_zt=23&_nc_ht=scontent.fdac14-1.fna&_nc_gid=ALF2VZ9TS-bo8WZ5hOM5uuQ&oh=00_AYDsDB1aJu2T-QK3cXomRa3yTjAuju07C75chy6ZxwjksQ&oe=6734D79A',
      fbUrl: 'https://www.facebook.com/BRACUCC',
    },
    {
      title: 'Cultural Club - BUCuC ',
      description: 'Cherishing traditions, and creating memories that will last a lifetime',
      image: 'https://scontent.fdac14-1.fna.fbcdn.net/v/t39.30808-6/453402136_898332132334496_2870795920684496285_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGnCbPrjhUb92hkcEpZoZ8RLp5v_DwWW4sunm_8PBZbi_hi435EVv2YKBx4wn_nZ6n1XEAzDKLr1GXX1982_bo8&_nc_ohc=OgJd_zagYtYQ7kNvgGP51jG&_nc_zt=23&_nc_ht=scontent.fdac14-1.fna&_nc_gid=AwoCGbs_vo0UT4YRz88uqgF&oh=00_AYD3GtA7-bpRx5ZC-GhYyr4KSsmylQhEWODiP-Fh2mWV8g&oe=6734C242',
      fbUrl: 'https://www.facebook.com/bucuc',
    },
    {
        title: 'Business Club (BIZ BEE) ',
        description: '𝐋𝐞𝐚𝐝 | 𝐄𝐦𝐩𝐨𝐰𝐞𝐫 | 𝐑𝐞𝐝𝐞𝐟𝐢𝐧𝐞 One of the prestigious clubs in Bangladesh.',
        image: 'https://scontent.fdac14-1.fna.fbcdn.net/v/t39.30808-1/463930640_936371685185570_7644286606350864490_n.jpg?stp=dst-jpg_s200x200&_nc_cat=111&ccb=1-7&_nc_sid=f4b9fd&_nc_eui2=AeHuH0sfDB_NH4vRp3v84jsVt7fWzSIrv7y3t9bNIiu_vIqi3uUZCpzvIuj6wLiXBzUlYgPKjE6SsxdtL3Y3p9jC&_nc_ohc=fbCZeayeVNoQ7kNvgE0c6Uv&_nc_zt=24&_nc_ht=scontent.fdac14-1.fna&_nc_gid=AUMMKctlhyZsp7LY4oSQYO0&oh=00_AYBTkw01KUJRLI98Eqx6BNcxd70w6Uw4vXuY472WyImw2w&oe=6734D52D',
        fbUrl: 'https://www.facebook.com/bizbee.club',
      },
      {
        title: 'Esports Club-BUESC ',
        description: 'Home to the largest gaming and esports community.',
        image: 'https://scontent.fdac14-1.fna.fbcdn.net/v/t39.30808-1/360088999_107162152452992_3353691746196811524_n.jpg?stp=dst-jpg_s200x200&_nc_cat=107&ccb=1-7&_nc_sid=f4b9fd&_nc_eui2=AeHquSUSczjXcZ5k2EI-ER6o7X0v2ijeuCftfS_aKN64J-65Jn3BYjw00h3SSYGKFLchjnJZp8clCtQBRoHOJH_R&_nc_ohc=yQVzxdf9x70Q7kNvgF1zisr&_nc_zt=24&_nc_ht=scontent.fdac14-1.fna&_nc_gid=A96Ztg02H33xpRLh_sBSahV&oh=00_AYD1koKUSj9if0GSYaDmanO7kKtfIEZTHzzXMgpWe5Ko2Q&oe=6734E3F4',
        fbUrl: 'https://www.facebook.com/BRACUEsportsClub',
      },
  ];

  return (
    <Carousel 
      plugins={[
        Autoplay({
          delay: 1700,
        }),
      ]}
      className="w-full md:w-[70%]"
    >
        <CarouselContent className="-ml-2 md:-ml-4">
            {clubs.map((club, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="h-[400px]">
                    <CardHeader className="p-4">
                        <div className="flex items-center space-x-3">
                            <img
                                src={club.image}
                                alt={club.title}
                                width={50}
                                height={50}
                                className="rounded-full"
                            />
                            <div>
                                <CardTitle className="text-lg truncate">{club.title}</CardTitle>
                                <CardDescription className="text-sm line-clamp-2">{club.description}</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-4">
                        <p className="text-gray-600">Stay updated with club activities and events.</p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center p-4">
                        
                        <Button className="font-semibold">See Activities</Button>
                    </CardFooter>
                </Card>
            </CarouselItem>
            ))}
        </CarouselContent>
    </Carousel>

  );
};

export default ClubCarousel;

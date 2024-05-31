"use client";
import Image from "next/image";
import laughEmoji from '../../../public/laugh.png';
import HeroImg from '../../../public/mainImg.svg';

export default function HomeHero() {

    const laughEmojis = [

    ]

    return (
        <div className="w-4/6 bg-complement relative h-full flex flex-row items-center justify-center border border-red-500">
            <div>
                <Image src={laughEmoji} alt="A laugh emoji" />
            </div>
            <div className="flex items-start text-start w-1/2 h-full pl-8">
                <h1 className="w-full h-full border text-secondary leading-relaxed border-red-500">Generate endless jokes on the click of a button</h1>
            </div>
            <div className="h-full w-1/2 border flex items-start justify-center border-red-500">
                <Image
                    src={HeroImg}
                    alt="Hero image of cartoon holding a microphone"
                    className="w-full h-full"
                />
                <div>

                </div>
            </div>
        </div>

    )
}
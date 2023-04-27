import Image from 'next/image'
import type {MouseEventHandler} from 'react'
import {Inter} from 'next/font/google'
import {LazyImage} from '../components/lazyImage'
import {useState} from "react";
import {random} from 'lodash';

const inter = Inter({subsets: ['latin']})
const myRandom = () => random(1,123);
const generateId = () => Math.random().toString(36).substring(2,  9);

export default function Home() {
    const [images, setImages] = useState<Array<IFoxImageItem>>([])
    const addNewFox: MouseEventHandler<HTMLButtonElement> = (event) => {
        event.preventDefault();
        const target = event.target;
        const newImageItem: IFoxImageItem = {
            id: generateId(),
            url: `https://randomfox.ca/images/${myRandom()}.jpg`,
        }

        setImages([
            ...images,
            newImageItem
        ]);
        window.plausible("add_fox");
    }

    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
        >
            <head>
                <script
                    defer
                    data-domain="yourdomain.com"
                    src="https://plausible.io/js/script.js"
                ></script>
            </head>
            <h1 className="text-3xl font-bold underline">
                Hello world!
            </h1>
            <button onClick={addNewFox}> Add new fox</button>
            {images.map(({id, url}) => (
                <div key={id} className={"p-4"}>
                    <LazyImage
                        className={"rounded bg-amber-300"}
                        width={320}
                        height={"auto"}
                        onClick={() => console.log("hola")}
                        src={url}/>
                </div>
            ))
            }
        </main>
    )
}

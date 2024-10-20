'use client'

import React, { ReactNode } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import useEmblaCarousel from 'embla-carousel-react'
import './embla.css';

interface EmblaCarouselProps {
    title: string;
    slides: { isPortrait: boolean; Component: ReactNode }[];
    options?: EmblaOptionsType
}

export default function EmblaCarousel({ title, slides, options}: Readonly<EmblaCarouselProps>) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  return (
    <section className="embla">
        <div className="flex flex-wrap lg:flex-nowrap justify-between items-center mb-4 lg:mb-10">
            <h2 className="font-display text-2xl font-normal">{ title }</h2>
            <div className="flex items-center justify-between gap-2 ml-auto">
                <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
                <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
            </div>
        </div>
        <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
            {slides.map((slide, index) => (
                <div className={`embla__slide${slide.isPortrait ? ' embla__slide--portrait' : ''}`} key={index}>
                    { slide.Component }
                </div>
            ))}
            </div>
        </div>


    </section>
  )
}

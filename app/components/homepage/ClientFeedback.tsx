import React from 'react'

import VideoPlayer from '../video-player/VideoPlayer';
import EmblaCarousel from '../carousel/EmblaCarousel';
import clsx from 'clsx';

interface ClientFeedbackProps {
  items: {
    key?: string;
    name?: string;
    description?: string;
    wistiaVideo?: {
      id: number;
      hashed_id: string;
    };
    videoOrientationPortrait?: boolean;
  }[]
}

export default function ClientFeedback({ items }: Readonly<ClientFeedbackProps>) {

  return (
    <div>
      <EmblaCarousel
        title="Mida arvavad meie vilistlased?"
        slides={
          items.map((item, index) => {
            return {
              isPortrait: !!item.videoOrientationPortrait,
              Component:
              <div
                key={item.key}
                className={clsx('flex flex-auto flex-col max-h-[500px] bg-white rounded-sm p-1', {
                  'flex-col-reverse': index % 2 > 0,
                  'mt-8': index % 2 > 0 && !item.videoOrientationPortrait
                })}>
                <div className="p-2 flex flex-col">
                  <strong className="font-display font-normal">{ item.name }</strong>
                  <p className="text-sm">{ item.description }</p>
                </div>

                { item.wistiaVideo &&
                  <VideoPlayer videoId={item.wistiaVideo.hashed_id.replaceAll(/%E2%80%8B/g, '')} isPortrait={item.videoOrientationPortrait} />
                }
              </div>
            }
          })
        }
        options={{
          slidesToScroll: 'auto'
        }}
      />

    </div>
  )
}

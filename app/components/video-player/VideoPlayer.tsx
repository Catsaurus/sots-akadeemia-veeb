'use client'

import { WistiaPlayer, WistiaPlayerElement } from '@wistia/wistia-player-react';
import { PlayCircleIcon } from '@heroicons/react/20/solid';
import { useRef } from 'react';

export default function VideoPlayer({ videoId, isPortrait }: {videoId: string; isPortrait?: boolean}) {

    const player = useRef<WistiaPlayerElement>(null);

    if (!videoId) return null
    return (
        <div className="group relative">
            <WistiaPlayer
                mediaId={videoId}
                controlsVisibleOnLoad={false}
                wistiaPopover
                popoverAnimation="fade"
                popoverBoxShadow
                className="wistia-player"
                aspect={isPortrait ? 9 / 16 : 16 / 9}
                bigPlayButton={false}
                ref={player}
            />
            <button className="absolute left-3 bottom-3 transition-all" onClick={() => player.current?.play()}>
                <PlayCircleIcon className="w-12 h-12 transition-all opacity-65 hover:opacity-25 group-hover:w-16 group-hover:h-16" />
            </button>
        </div>

    );
}
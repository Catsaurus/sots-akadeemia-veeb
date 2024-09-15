import ContentBlock from "./ContentBlock"

export default function ShortCourseSchedule() {
    return (
        <ContentBlock title="Korraldus ja päevakava">
            <div className='flex flex-row gap-8'>
                <div >
                  <p className='font-bold'>Päev 1</p>
                  <p className='text-sm md:text-base'>13:00-14:00 koolitus</p>
                </div>
                <div>
                  <p className='font-bold'>Päev 2</p>
                  <p className='text-sm md:text-base'>13:00-14:00 koolitus</p>
                </div>
                <div>
                  <p className='font-bold'>Päev 3</p>
                  <p className='text-sm md:text-base'>13:00-14:00 koolitus</p>
                </div>
              </div>
              <p className='text-sm md:text-base'>Konfliktide lahendamise lühiklassi eesmärgiks on saada ülevaade konflikte käsitlevatest teooriatest sh tutvustamisele tulevad teooriad saavad seostatud praktiliset juhtumite ja olukordadega, kas koolitajate endi praktikast või soovil ja vajadusel osalejate praktikas ette tulnud juhtumite kaudu.</p>        
        </ContentBlock>
    );
}

import React from 'react'
import { CCarousel, CCarouselItem, CCarouselCaption, CImage } from '@coreui/react'
import '@coreui/coreui/dist/css/coreui.min.css'
import img1 from '../../../assets/auladi/1.png'
import img2 from '../../../assets/auladi/2.png'
import img3 from '../../../assets/auladi/3.png'
import img4 from '../../../assets/auladi/4.png'
import img5 from '../../../assets/auladi/5.png'
import img6 from '../../../assets/auladi/6.png'
import img7 from '../../../assets/auladi/7.png'
import { auto } from '@popperjs/core'

const ImageCarousel = () => {
  return (
    <CCarousel interval={1000}>
      <CCarouselItem>
        <CImage
          height={600}
          style={{ objectFit: 'cover' }}
          className="d-block w-100"
          src={img1}
          alt="Slide 1"
        />
      </CCarouselItem>
      <CCarouselItem>
        <CImage
          height={600}
          style={{ objectFit: 'cover' }}
          className="d-block w-100"
          src={img2}
          alt="Slide 1"
        />
      </CCarouselItem>
      <CCarouselItem>
        <CImage
          height={600}
          style={{ objectFit: 'cover' }}
          className="d-block w-100"
          src={img3}
          alt="Slide 1"
        />
      </CCarouselItem>
      <CCarouselItem>
        <CImage
          height={600}
          style={{ objectFit: 'cover' }}
          className="d-block w-100"
          src={img4}
          alt="Slide 1"
        />
      </CCarouselItem>
      <CCarouselItem>
        <CImage
          height={600}
          style={{ objectFit: 'cover' }}
          className="d-block w-100"
          src={img5}
          alt="Slide 1"
        />
      </CCarouselItem>
      <CCarouselItem>
        <CImage
          height={600}
          style={{ objectFit: 'cover' }}
          className="d-block w-100"
          src={img6}
          alt="Slide 1"
        />
      </CCarouselItem>
      <CCarouselItem>
        <CImage
          height={600}
          style={{ objectFit: 'cover' }}
          className="d-block w-100"
          src={img7}
          alt="Slide 1"
        />
      </CCarouselItem>
    </CCarousel>
  )
}

export default ImageCarousel

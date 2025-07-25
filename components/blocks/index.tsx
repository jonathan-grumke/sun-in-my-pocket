import { tinaField } from 'tinacms/dist/react';
import { Page, PageBlocks } from '../../tina/__generated__/types';
// import { Hero } from './hero';
import { Content } from './content';
import { Features } from './features';
import { Testimonial } from './testimonial';
import { Video } from './video';
import { Callout } from './callout';
import { Stats } from './stats';
import { CallToAction } from './call-to-action';
import { ImageSolo } from './image-solo';
import { ImageDuo } from './image-duo';
import client from '@/tina/__generated__/client';

export const Blocks = (props: Omit<Page, 'id' | '_sys' | '_values'>) => {
  if (!props.blocks) return null;
  return (
    <>
      {props.blocks.map(function (block, i) {
        return (
          <div key={i} data-tina-field={tinaField(block)}>
            <Block {...block} />
          </div>
        );
      })}
    </>
  );
};

const Block = (block: PageBlocks) => {
  switch (block.__typename) {
    case 'PageBlocksVideo':
      return <Video data={block} />;
    // case 'PageBlocksHero':
    //   return <Hero data={block} />;
    case 'PageBlocksCallout':
      return <Callout data={block} />;
    case 'PageBlocksStats':
      return <Stats data={block} />;
    case 'PageBlocksContent':
      return <Content data={block} />;
    case 'PageBlocksFeatures':
      return <Features data={block} />;
    case 'PageBlocksTestimonial':
      return <Testimonial data={block} />;
    case 'PageBlocksCta':
      return <CallToAction data={block} />;
    case 'PageBlocksImageSolo':
      return <ImageSolo data={block} />;
    case 'PageBlocksImageDuo':
      return <ImageDuo data={block} />;
    // case 'PageBlocksDiaryPostList':
    //   return <DiaryPostList data={block} />;
    default:
      return null;
  }
};

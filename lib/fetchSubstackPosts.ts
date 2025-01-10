// import RSSParser from 'rss-parser';

// export interface SubstackPost {
//   title: string;
//   link: string;
//   pubDate: string;
//   contentSnippet: string;
// }

// const RSS_URL = 'https://vrushalivip2002.substack.com/feed';

// const fetchSubstackPosts = async (): Promise<SubstackPost[]> => {
//   const parser = new RSSParser();
//   const feed = await parser.parseURL(`${RSS_URL}?timestamp=${new Date().getTime()}`);

//   return feed.items.map((item) => ({
//     title: item.title || '',
//     link: item.link || '',
//     pubDate: item.pubDate || '',
//     contentSnippet: item.contentSnippet || '',
//   }));
// };

// export default fetchSubstackPosts;

// import RSSParser from 'rss-parser';

// export interface SubstackPost {
//   title: string;
//   link: string;
//   pubDate: string;
//   contentSnippet: string;
//   imageUrl: string | null;
// }

// const RSS_URL = 'https://vrushalivip2002.substack.com/feed';

// const fetchSubstackPosts = async (): Promise<SubstackPost[]> => {
//   const parser = new RSSParser();
//   const feed = await parser.parseURL(`${RSS_URL}?timestamp=${new Date().getTime()}`);

//   return feed.items.map((item) => {
//     // Attempt to extract image from the content
//     let imageUrl: string | null = null;

//     // Check for an image in the content (if present)
//     const content = item.content || '';
//     const imageMatch = content.match(/<img src="([^"]+)"/);
//     if (imageMatch && imageMatch[1]) {
//       imageUrl = imageMatch[1];  // Extract the image URL from the content
//     }

//     return {
//       title: item.title || '',
//       link: item.link || '',
//       pubDate: item.pubDate || '',
//       contentSnippet: item.contentSnippet || '',
//       imageUrl: imageUrl || null,  // Set image URL (or null if no image found)
//     };
//   });
// };

// export default fetchSubstackPosts;


// import RSSParser from 'rss-parser';

// export interface SubstackPost {
//   title: string;
//   link: string;
//   pubDate: string;
//   contentSnippet: string;
//   imageUrl: string | null;
// }

// interface Enclosure {
//   url: string;
//   type: string;
// }

// const RSS_URL = 'https://vrushalivip2002.substack.com/feed';

// const fetchSubstackPosts = async (): Promise<SubstackPost[]> => {
//   const parser = new RSSParser();
//   const feed = await parser.parseURL(`${RSS_URL}?timestamp=${new Date().getTime()}`);

//   return feed.items.map((item) => {
//     // Define the type for enclosures and ensure item.enclosures is an array of Enclosure objects
//     let imageUrl: string | null = null;

//     // Check for the <enclosure> tag with type 'image/jpeg' or 'image/png'
//     if (item.enclosures && item.enclosures.length > 0) {
//       const enclosures: Enclosure[] = item.enclosures; // Ensure we cast to the Enclosure type

//       const imageEnclosure = enclosures.find((enclosure) =>
//         enclosure.type.startsWith('image/')
//       );
//       if (imageEnclosure) {
//         imageUrl = imageEnclosure.url; // Extract image URL from the enclosure
//       }
//     }

//     // If no image URL in enclosure, try to extract from content:encoded field
//     if (!imageUrl && item['content:encoded']) {
//       const content = item['content:encoded'] || '';
//       // Match the first <img> tag in content and extract the src attribute (image URL)
//       const imageMatch = content.match(/<img[^>]+src="([^"]+)"/);
//       if (imageMatch && imageMatch[1]) {
//         imageUrl = imageMatch[1]; 
//       }
//     }

//     return {
//       title: item.title || '',
//       link: item.link || '',
//       pubDate: item.pubDate || '',
//       contentSnippet: item.contentSnippet || '',
//       imageUrl: imageUrl || null, 
//     };
//   });
// };

// export default fetchSubstackPosts;

import RSSParser from 'rss-parser';

export interface SubstackPost {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  imageUrl: string | null;
}

interface Enclosure {
  url: string;
  type: string;
}

const RSS_URL = 'https://vrushalivip2002.substack.com/feed';

const fetchSubstackPosts = async (): Promise<SubstackPost[]> => {
  const parser = new RSSParser();
  const feed = await parser.parseURL(`${RSS_URL}?timestamp=${new Date().getTime()}`);

  return feed.items.map((item) => {
    let imageUrl: string | null = null;

    if (item.enclosures && item.enclosures.length > 0) {
      const enclosures: Enclosure[] = item.enclosures;

      const imageEnclosure = enclosures.find((enclosure) =>
        enclosure.type.startsWith('image/')
      );
      if (imageEnclosure) {
        imageUrl = imageEnclosure.url;
      }
    }

    if (!imageUrl && item['content:encoded']) {
      const content = item['content:encoded'] || '';
      const imageMatch = content.match(/<img[^>]+src="([^"]+)"/);
      if (imageMatch && imageMatch[1]) {
        imageUrl = imageMatch[1]; 
      }
    }

    return {
      title: item.title || '',
      link: item.link || '',
      pubDate: item.pubDate || '',
      contentSnippet: item.contentSnippet || '',
      imageUrl: imageUrl || null, 
    };
  });
};

export default fetchSubstackPosts;

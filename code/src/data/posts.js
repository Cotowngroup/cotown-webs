module.exports = async (config) => {

  const gql = require('./graphql');
  const QUERY = `
  query data ($id: Int) {
    data: Marketing_PostList (
      orderBy: [{ attribute: Publish_date, direction:DESC } ]
      where: { 
        AND: [
          { Segment_id: { EQ: $id } } 
          { Published: {EQ: true } }
        ]
      }
    ) {
      id
      Publish_date
      Featured
      Slug
      Slug_en
      Title
      Title_en
      Subtitle
      Subtitle_en
      Content
      Content_en
      Rich_content
      Rich_content_en
      Author: TeamViaAuthor_id {
        id
        Name
        Link
        Position
        Position_en
        Description
        Description_en
        Image {
            name
        }
      }
      Tags: Post_tagListViaPost_id {
        Tag: TagViaTag_id {
          id
          Name
          Name_en
        }
      }
      Image {
        name
      }
      Images: Media_postListViaPost_id {
        id
        Name
        Alt
        Alt_en
        Image {
          name
        }
      }
    }
  }`;
  const data = await gql(QUERY, config, 'posts');
  const sanitizeRichContent = (str) => str ? str.replace(/&nbsp;/g, ' ') : str;
  return data.data.map((post) => ({
    ...post,
    Rich_content: sanitizeRichContent(post.Rich_content),
    Rich_content_en: sanitizeRichContent(post.Rich_content_en),
  }));  
};
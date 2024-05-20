import { createClient } from "contentful";
import { getAboutContent } from "@/utils/type-cast.utils";
import { AboutContent } from "../types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";


if (!process.env.SPACE_ID || !process.env.ACCESS_TOKEN_ABOUT) {
  throw new Error('SPACE_ID or ACCESS_TOKEN is not provided');
}
const client = createClient({
  space: process.env.SPACE_ID,
  accessToken: process.env.ACCESS_TOKEN_ABOUT,
});

const getAboutEntries = async (): Promise<AboutContent> => {
  const entries = await client.getEntries({ content_type: "blogAbout" });
  //To convert response as AboutContent type
  const aboutContent = entries.items.map((item) => { return getAboutContent(item.fields); });
  return aboutContent[0];
};

export default async function About() {
  const aboutContent = await getAboutEntries();
  const {content} = aboutContent.fields;
  return (
    <>
      <main className="min-h-screen p-24 flex justify-center">
                    <div className="max-w-2xl">
                        <div className="[&>p]:mb-8 [&>h2]:font-extrabold">
                            {documentToReactComponents(content)}
                        </div>
                    </div>
        </main>
    </>
  );
}

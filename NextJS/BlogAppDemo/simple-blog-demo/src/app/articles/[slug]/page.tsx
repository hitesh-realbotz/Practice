import { BlogItem, ExtendedBlogItem } from "@/app/types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { createClient } from "contentful";
import { BlogPageProps } from "@/app/types";

if (!process.env.SPACE_ID || !process.env.ACCESS_TOKEN) {
    throw new Error('SPACE_ID or ACCESS_TOKEN is not provided');
}

const client = createClient({
    space: process.env.SPACE_ID,
    accessToken: process.env.ACCESS_TOKEN,
});

export async function generateStaticParams() {
    const queryOptions = {
        content_type: "blog",
        select: "fields.slug",
    };

    const articles = await client.getEntries(queryOptions);
    return articles.items.map((article) => ({
        slug: article.fields.slug,
    }));
}

const fetchBlogPost = async (slug: string): Promise<BlogItem> => {
    const queryOptions = {
        content_type: "blog",
        "fields.slug[match]": slug,
    };
    try {
        const queryResult = await client.getEntries<ExtendedBlogItem>(queryOptions);
        return queryResult.items[0];
    } catch (error) {
        throw new Error(`Error fetching blog post: ${error}`);
    }
};

export default async function BlogPage(props: BlogPageProps) {
    const { params } = props;
    const { slug } = params;
    const article = await fetchBlogPost(slug);
    const { title, date, content } = article.fields;

    return (
        <main className="min-h-screen p-24 flex justify-center">
            <div className="max-w-2xl">
                <h1 className="font-extrabold text-3xl mb-2">{title}</h1>

                <p className="mb-6 text-slate-400 ">
                    Posted on{" "}
                    {new Date(date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </p>
                <div className="[&>p]:mb-8 [&>h2]:font-extrabold">

                    {documentToReactComponents(content)}
                </div>
            </div>
        </main>
    );
}

////Manual Handling Contentful API response
// import { BlogItem, BlogPageProps } from "@/app/types";
// import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
// import { createClient } from "contentful";
// import { getBlogItem } from "@/utils/type-cast.utils";

// if (!process.env.SPACE_ID || !process.env.ACCESS_TOKEN) {
//     throw new Error('SPACE_ID or ACCESS_TOKEN is not provided');
// }
// const client = createClient({
//     space: process.env.SPACE_ID,
//     accessToken: process.env.ACCESS_TOKEN,
// });

// export async function generateStaticParams() {
//     const queryOptions = {
//         content_type: "blog",
//         select: "fields.slug",
//     };

//     const articles = await client.getEntries(queryOptions);
//     return articles.items.map((article) => ({
//         slug: article.fields.slug,
//     }));
// }

// const fetchBlogPost = async (slug: string): Promise<BlogItem> => {
//     const queryOptions = {
//         content_type: "blog",
//         "fields.slug[match]": slug,
//     };
//     const queryResult = await client.getEntries(queryOptions);
//     // Ensure that at least one item is returned
//     if (queryResult.items.length === 0) {
//         throw new Error(`No blog post found with slug '${slug}'.`);
//     }

//     // Return BlogItem
//     return getBlogItem(queryResult.items[0].fields);
// };

// export default async function BlogPage(props: BlogPageProps) {
//     const { params } = props;
//     const { slug } = params;
//     const article = await fetchBlogPost(slug);
//     const { title, date, content, thumbnail } = article.fields;
//     const imageUrl = thumbnail.fields.file.url;

//     return (
//         <main className="min-h-screen p-24 flex justify-center">
//             <div className="max-w-2xl">
//                 <h1 className="font-extrabold text-3xl mb-2">{title}</h1>

//                 <p className="mb-6 text-slate-400 ">
//                     Posted on{" "}
//                     {new Date(date).toLocaleDateString("en-US", {
//                         year: "numeric",
//                         month: "long",
//                         day: "numeric",
//                     })}
//                 </p>
//                 <img
//                     src={imageUrl}
//                     alt={title}
//                     style={{ width: "100%", height: "30%", maxHeight: "30vh" }}
//                     className="rounded-lg w-full object-cover md:h-full md:w-48"
//                 />
//                 <div className="[&>p]:mb-8 [&>h2]:font-extrabold">

//                     {documentToReactComponents(content)}
//                 </div>
//             </div>
//         </main>
//     );
// }
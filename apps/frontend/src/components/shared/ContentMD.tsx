import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"

export interface ContentMDProps {
	markdown: string
}

export function ContentMD(props: ContentMDProps) {
	return (
		<Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} skipHtml={false}>
			{props.markdown}
		</Markdown>
	)
}

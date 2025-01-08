import type { MDXComponents } from "mdx/types";
import Heading from "./components/ui/heading";
import Link, { LinkProps } from "next/link";
import Image, { ImageProps } from "next/image";

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        h1: ({children}) => <Heading>{children}</Heading>,
        h2: ({children}) => <Heading variant="h2" tag="h2">{children}</Heading>,
        h3: ({children}) => <Heading variant="h3" tag="h3">{children}</Heading>,
        h4: ({children}) => <Heading variant="h4" tag="h4">{children}</Heading>,
        a: ({children, ...props}) => <Link {...props as LinkProps}>{children}</Link>,
        img: props => <Image
            sizes="100vw"
            width={900}
            height={500}
            className="w-full h-auto"
            {...props as ImageProps}
            alt={props.alt || ''}
        />,
        ...components
    }
}

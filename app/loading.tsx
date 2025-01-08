import Loader from "@/components/ui/loader";
import Section from "@/components/ui/section";

export default function Loading() {
    return (
        <Section>
            <Loader className="mx-auto mt-7 size-32" />
        </Section>
    );
}

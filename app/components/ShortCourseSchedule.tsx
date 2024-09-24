import { ShortCourse } from "@/sanity/types";

import ContentBlock from "./ContentBlock"
import FormattedPortableText from "./FormattedPortableText";

interface ShortCourseScheduleProps {
  shortCourse: ShortCourse;
}

export default function ShortCourseSchedule({ shortCourse }: Readonly<ShortCourseScheduleProps>) {
  if (!shortCourse.organizationalInformation) {
    return null;
  }
  return (
    <ContentBlock title="Korraldus ja päevakava">
      <FormattedPortableText value={shortCourse.organizationalInformation} />
    </ContentBlock>
  );
}

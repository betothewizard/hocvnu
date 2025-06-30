import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { styles } from "~/styles";
import type { Route } from "./+types/quizzes";
import { getQuizzesMetadata } from "~/services/getQuestions";
import { Button } from "~/components/ui/button";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

export async function loader() {
  const quizzesMetadata = await getQuizzesMetadata();
  return quizzesMetadata;
}

export default function Quizzes({ loaderData }: Route.ComponentProps) {
  return (
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        {loaderData.map((quizMetadata) => (
          <Card key={quizMetadata.code}>
            <CardHeader className="flex flex-row justify-between items-center">
              <div>
                <CardTitle>{quizMetadata.name}</CardTitle>
                <CardDescription>{quizMetadata.total} câu</CardDescription>
              </div>

              <Button asChild>
                <Link to={`/trac-nghiem/${quizMetadata.code}`}>
                  <ArrowRight />
                </Link>
              </Button>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}

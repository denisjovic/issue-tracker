import IssuesList from "../components/IssuesList";
import LabelList from "../components/LabelList";
import { useState } from "react";

export default function Issues() {
  const [labels, setLabels] = useState([]);
  return (
    <div>
      <main>
        <section>
          <h1>Issues</h1>
          <IssuesList labels={labels} />
        </section>
        <aside>
          <LabelList
            selected={labels}
            toggle={(label) =>
              setLabels((currentLabels) =>
                currentLabels.includes(labels)
                  ? currentLabels.filter(
                      (currentLabel) => currentLabel !== label
                    )
                  : [...currentLabels, label]
              )
            }
          />
        </aside>
      </main>
    </div>
  );
}

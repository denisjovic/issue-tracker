import IssuesList from "../components/IssuesList";
import LabelList from "../components/LabelList";
import { useState } from "react";
import { StatusSelect } from "../components/StatusSelect";

export default function Issues({ label }) {
  const [labels, setLabels] = useState([]);
  const [status, setStatus] = useState("");
  return (
    <div>
      <main>
        <section>
          <h1>Issues</h1>
          <IssuesList labels={labels} status={status} />
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
          <h3>Status</h3>
          <StatusSelect
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </aside>
      </main>
    </div>
  );
}

import React from "react";
import Panel from "../../components/panels/Panel";

export interface ITutorialPanel {
    tutorial: any
}

const TutorialPanel: React.FC<ITutorialPanel> = ({ tutorial }: ITutorialPanel) => {
    return (
    <Panel>
        {tutorial}
    </Panel>
    );
}

export default TutorialPanel;
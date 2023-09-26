import React from 'react';
import Page from 'components/pages/Page';
import TutorialPanel from 'features/Tutorials/TutorialPanel';

export interface ITutorialPage {
  tutorial: any
}

export const TutorialPage: React.FC<ITutorialPage> = ({ tutorial }: ITutorialPage) => {
  return (
    <Page>
      <TutorialPanel tutorial={tutorial} />
    </Page>
  );
};

export default TutorialPage;
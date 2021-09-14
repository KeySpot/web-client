import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import SwipeTabs from './SwipeTabs';
import CodeBlock from '../components/CodeBlock';

export default function InstallTabs() {
    const [value, setValue] = useState(0);
  
    useEffect(function () {
      if (window.navigator.appVersion.indexOf("Win") != -1) setValue(0);
      else if (window.navigator.appVersion.indexOf("Mac") != -1) setValue(1);
      else if (window.navigator.appVersion.indexOf("Linux") != -1) setValue(2);
      else setValue(2);
    }, [])
  
    const installTabs = [
      {
        label: "Windows",
        content: (
          <ReactMarkdown components={{ code: CodeBlock }} >
            {"```bash\n\
              # Add KeySpot scoop bucket\n\
              scoop bucket add keyspot https://github.com/keyspot/scoop-bucket\n\
              \n\
              scoop install keyspot"
            }
          </ReactMarkdown>
        ),
      },
      {
        label: "Mac",
        content: (
          <ReactMarkdown components={{ code: CodeBlock }} >
            {"```bash\n\
              # Add KeySpot homebrew tap\n\
              brew tap keyspot/cli\n\
              \n\
              brew install keyspot"
            }
          </ReactMarkdown>
        ),
      },
      {
        label: "Linux (Ubuntu/Debian)",
        content: (
          <ReactMarkdown components={{ code: CodeBlock }} >
            {"```bash\n\
              # Add KeySpot ppa\n\
              curl -s --compressed \"https://keyspot.github.io/cli-tool-ppa/KEY.gpg\" | sudo apt-key add -\n\
              sudo curl -s --compressed -o /etc/apt/sources.list.d/keyspot.list \"https://keyspot.github.io/cli-tool-ppa/keyspot.list\"\n\
              sudo apt update\n\
              \n\
              sudo apt install keyspot"
            }
          </ReactMarkdown>
        ),
      },
    ];
  
    return (
        <SwipeTabs tabs={installTabs} value={value} onChange={index => setValue(index)} />
    );
  }
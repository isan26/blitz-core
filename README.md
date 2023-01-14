# Intro
**Blitzui** is a tool for dynamically generating a website using already existing components and Behaviours, giving the possibility to compose your application and change it on demand without having to re-build

In the context of Blitzui, we have to main concepts.
- Components
- Behaviours
- Component Pool
- Behaviour Pool

**Components**: Are UI components including React components meant to be reused, the components is what we are going to use to "generate" the ui.

**Behaviours**: Are functions we can pass to components as props, the idea of behaviours is to add functionality to the UI.

**Component Pools**: Is where we register our components and pass it to the Blitz main function.

**Behaviour Pool**: Is where we register our behaviours to pass it down to the Blitz main function.


By combining **Components** and **Behaviours**, we can compose our UI and reuse. This is very useful when having to create applications like a CMS or to generate dynamic reports with interactivity.

# Basic Example
- visit : https://blitzui.com/ for a demo page
- repo : https://github.com/isan26/blitz-demo


## First steps.

Let's create a component and a simple component Pool.
A component Pool is a big object representing a Tree like structure, this tree structure will be used when creating the JSON with the UI instructions.

On a newly created react app:

1. Create a folder named `components` on `src` folder
1. Create a index.js file
1. Create a TestComponent.js file
1. Copy and paste the code above to the files

```
// Paste on components/index.js file

import TestComponent from "./TestComponent"

export default {
    "basic": {
        "TestComponent": TestComponent
    },
}

```


```
// Paste on TestComponent.js file
import React from 'react'

const TestComponent = ({ title, textGenerator, children }) => {

    const text = textGenerator();
    return (
        <>
            <h1>{title}</h1>
            <div>{text}</div>
            {children}
        </>
    )
}

export default TestComponent
```

Now that we have ready our basic component pool, let's create the behaviour pool

1. Create a folder named `behaviours` on `src` folder
1. Create a file `index.js` inside this folder
1. Create a file `textGenerator.js` inside this folder
1. Paste the code above into the respective files.


```
// Paste into index.js
import textGenerator from "./textGenerator";

export default {
    "dummy": {
        "textGenerator": textGenerator
    }
}

```

```
// Paste into textGenerator.js
function textGenerator() {
    return "Hello World";
}

export default textGenerator;

```


At this point we have the component pool and the behaviour pool, let's bring them together. 
Create a file named demo.json and put the following:

```
[
    {
        "component": "basic.TestComponent",
        "props": {
            "textGenerator": {
                "behaviour": "dummy.textGenerator"
            },
            "title": "Title"
        },
        "children": [
            {
                "component": "span",
                "children": "I am a simple span"
            }
        ]
    }
]
```

This is the configuration file, and what is instructing is to print a `TestComponent` that can be found on the pool by going into `basic.TestComponent`. Pass the prop `textGenerator` which is a `behaviour` that can be found in `dummy.textGenerator` (the Behaviour pool we already defined). Also pass the prop title and as children, print a simple span with some text.


## Bringing all together

On your App.js:

1. Import the Blitz main function
1. Import your component Pool
1. Import you behaviour Pool
1. Import your demo.json file
1. Pass your component pool and behaviour pool to the Blitz function and assign the result to a constant (will return a function).
1. Pass you config file to this function and print the results.

See the following code for reference.


```
import Blitz from '@blitzui/core';
import components from './components';
import behaviours from './behaviours';
import demo from './demo';

const blitz = Blitz(components, behaviours);

function App() {
  return (
    <div className="App">
      {blitz(demo)}
    </div>
  );
}

export default App;


```

## Executing Behaviours
Behaviours can be executed on the spot, meaning you won't pass the function but the value they generate. Check the following example.


```
//titleGenerator.js
export default function titleGenerator() {
    return "BlitzUI - Rocks";
}
```
```
//Behaviour Pool
import textGenerator from "./textGenerator";
import titleGenerator from "./titleGenerator";

export default {
    "dummy": {
        "textGenerator": textGenerator,
        "titleGenerator": titleGenerator
    }
}
```

```
[
    {
        "component": "basic.TestComponent",
        "props": {
            "textGenerator": {
                "behaviour": "dummy.textGenerator"
            },
            "title": {
                "behaviour": "dummy.titleGenerator",
                "execute": true
            }
        }
    }
]
```


This will pass the prop `title`, which is the value from executing the `Behaviour` on the spot, and the component will receive the text generated.

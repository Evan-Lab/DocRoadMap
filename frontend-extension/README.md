# Welcome To DocRoadMap Frontend Extension !

This extension is made in React

To start you need to install the dependencies by running the following command:

```bash

npm install

```

To launch the extension you can run the following command:

```bash

npm run build

```

---

Now you can load the extension in your browser by following the steps below:

```
1. Open the Extension Management page by navigating to
chrome://extensions.

2. Enable Developer Mode by clicking the toggle switch next to Developer mode.

3. Click the Load unpacked button and select the extension directory.

4. Load the extension which is in the dist folder.
```

To build the dockerfile you can run the following command:

```bash

docker build -t react-app .

```

To run the dockerfile you can run the following command:

```bash

docker run -p 3001:3001 react-app

```

# Beta Test Plan – DocRoadMap

### Team

- Baptiste Perard
- Evan Labourdette
- Julia Tran
- Nadia Moulouad

---

## 1. Context

DocRoadMap is a solution that includes a mobile app and a web extension, both designed to be user-friendly, straightforward, and intuitive. To ensure reliability, all data is sourced exclusively from government sources. You can use the mobile app and the web extension either separately or together to fully benefit from the solution.

### Why offer both a web extension and a mobile application?

The two tools are complementary and meet distinct but often simultaneous uses:

- Generally, users handle their administrative tasks on a computer through official government websites. Our web extension seamlessly integrates into these sites to assist them, so users don’t have to switch pages or open a new site. Our solution is available right where they are completing their tasks.
- Keeping track of tasks, managing reminders, and quickly accessing information anytime (even while on the go) is easy with the mobile app.

### Our solution also includes:

- A list of guides for the various situations and processes they may encounter as they start their professional journey.
- Reminders of critical dates and integrated calendar for an overview.
- A multilingual interface (French, English, Spanish for the moment)
- Two unique chatbots
- An extension that allows users to modify certain accessibility criteria (WCAG and RGAA) on an active web page.
- Plus additional features that we will explain later in the document.

The guide should be visual, interactive, and detailed, helping users step by step through all their processes. It will be tailored to both business needs and personal situations through a series of questions and answers.

One of the chatbots will be available to assist users with any questions they have about the steps in the process or to clarify any confusion regarding the procedures. If a step is missing, users will be able to provide that information to add it.

The current phase marks the transition to the beta version, where the goal is to test and validate the key features mentioned earlier before a wider rollout that focuses on user feedback.

---

## 2. Objectives

The purpose of the Beta Test Plan is to:

- ✅ Check the stability and effectiveness of critical features.
- ✅ Ensure that the user experience is smooth, intuitive, and as simple as possible.
- ✅ Test the integration and relevance of the guide and support chatbot.
- ✅ Identify bugs and areas for improvement before focusing on features requested by users.

---

## 3. Key Features for the Beta

The tests will focus on the following features:

- Authentication: Secure login and logout.
- Profile management: Access and modification of personal information.
- User Dashboard/Home Page: An overview of guides tailored to common scenarios, the user's ongoing personal processes, and a clickable calendar for easy navigation.
- Individual Approach: A comprehensive overview of all the steps in the process, where each step is clickable for more specific details. There’s also a progress bar to help visualize how far along you are in the journey. Users can manually confirm each step to keep better track of their progress.
- AI Chatbot: Help users with their inquiries about procedures and add personalized steps if needed.
- Chatbot Guide: This chatbot helps create a tailored approach by offering a selection of guides based on predefined questions and answers with the user.
- Web extension: The ability to enhance certain accessibility features of a webpage on predefined websites to better comply with WCAG/RGAA standards.
- Mobile: The app may be able to adjust to certain personal accessibility settings of the user.
- Reminder: Notifications for deadlines related to ongoing tasks set by the user, along with an integrated calendar to provide an overview of important dates.

---

## 4. Test Scenarios

### 4.1 Connection and Disconnection

- **User**: Any user
- **Goal**: To ensure that the authentication is working properly.
- **Priority**: Medium
- **Steps**:

1. Access the login page
2. Enter a valid email and password.
3. Receive a verification email
4. Click on the link to validate the profile.
5. Log in and access the profile.
6. Log out and check the return to the home screen.

- ✅ **Expected result**: Smooth login/logout process without any bugs, and clear error messages if the credentials are incorrect.

---

### 4.2 Generation of a Roadmap Related to the Approach

- **User**: Connected user
- **Goal**: To ensure that the chatbot can create a process without any errors.
- **Priority**: Very High
- **Steps**:

1. Select the type of case you want to create.
2. Access the case type creation interface (chatbot)
3. Answer the chatbot's questions and ensure they reflect the user's situation.
4. Once done, go to the procedures page.
5. Verify the process has been added with all necessary steps.

- ✅ **Expected outcome**: Process is recorded and displayed correctly.

---

### 4.3 Navigation in the Dashboard

- **User**: Connected user
- **Objective**: Check the display and fluidity of the dashboard
- **Priority**: Medium
- **Steps**:

1. Open the home menu.
2. View all dashboard functionalities (guides, processes, calendar).
3. Check for visual aids like illustrations and icons.

- ✅ **Expected outcome**: Smooth display, no lag or crashes.

---

### 4.4 Individual Approach

- **User**: Connected user
- **Goal**: Check the visualization and interactivity of the process map
- **Priority**: Medium
- **Steps**:

1. Go to the individual process section
2. Review how steps are displayed
3. Click each step to view details
4. Validate steps and schedule reminders
5. Verify progress bar updates correctly

- ✅ **Expected outcome**: Clear, interactive display with working features.

---

### 4.5 Q&A on an Ongoing Process

- **User**: Connected user
- **Goal**: Test the AI chatbot's reliability on administrative queries
- **Priority**: Medium
- **Steps**:

1. Ask a question about an administrative process
2. Assess clarity and relevance of the answer

- ✅ **Expected outcome**: Precise, helpful responses.

---

### 4.6 Adding a Custom Step

- **User**: Connected user
- **Goal**: Ensure a missing step is added with full detail
- **Priority**: Medium
- **Steps**:

1. Open an ongoing process
2. Describe missing step to chatbot
3. Answer clarifying questions if needed
4. Verify step is added
5. Confirm clarity and completeness

- ✅ **Expected outcome**: Step added dynamically and accurately.

---

### 4.7 Accessibility on Web Pages

- **User**: Connected user
- **Goal**: Validate accessibility updates via extension
- **Priority**: High
- **Steps**:

1. Visit a webpage
2. Activate extension
3. Click accessibility button, then "Make page accessible"
4. Confirm changes are WCAG/RGAA-compliant

- ✅ **Expected result**: Updated, compliant webpage.

---

### 4.8 Mobile App Accessibility

- **User**: Connected user
- **Goal**: Check app’s response to system accessibility settings
- **Priority**: High
- **Steps**:

1. Configure phone accessibility
2. Open DocRoadMap app
3. Ensure:
   - Text scales correctly
   - TalkBack (Android) works
   - Theme changes don’t affect usability

- ✅ **Expected outcome**: Full accessibility support without loss of functionality.

---

### 4.9 Deadline Notifications – Calendar

- **User**: Connected user
- **Goal**: Test task deadline reminders
- **Priority**: Low
- **Steps**:

1. Access calendar or a process
2. Verify presence of user-defined dates
3. Check scheduling and timing (D-7, D-3, D-1)
4. Confirm clarity and accuracy of notifications

- ✅ **Expected outcome**: Clear, timely alerts with visible reminders.

---

## 5. Known issues and limitations

### Reliability of AI:

- Despite using RAG or prompts, a generative AI can still experience hallucinations (errors) and may not respond accurately to various situations it encounters.
  - Question about ongoing procedures
  - Adapt the questions to the personal situation.
  - Addition of a step to an ongoing process
- Gathering the right sources of knowledge is essential, depending on how we set up our RAG, to ensure that our AI can provide the most suitable responses.

### ♿ Accessibility:

- Our information is still incomplete regarding the implementation of accessibility solutions, such as the use of error detection software and AI to improve ALT text for images on websites.

---

## 6. Validation Criteria

A feature is considered validated if:

- ✅ It operates without crashes or critical bugs.
- ✅ The user experience is smooth and intuitive.
- ✅ Performance and accessibility tests yield positive results.
- ✅ Feedback from testers confirms the service's usability.

---

## 7. Deliverables & Format

- 📄 Documentation: A detailed test report will be created.
- 📊 Project Progress Tracking: We will use Linear to monitor the status of features, tests, and bugs.

---

## 8. Expected Results

By following this Beta Test Plan, we aim to:

- ✅ Confirm that the essential features are stable and functioning properly.
- ✅ Identify and fix any bugs or UX/UI inconsistencies.
- ✅ Enhance the user experience based on feedback from testers and our point of contact, Flavien.
- ✅ Establish a benchmark to measure the project's progress for the final jury.
- ✅ Prepare for the transition to the expanded testing phase and the final optimization of the product.

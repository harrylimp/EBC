# EBC

## Project Introduction

**Welcome to Connex!** This is a state-of-the-art mobile application that aims to help in furthering the research of the digitsation of business cards. We aim to revolutinse the business card transaction process from paper to digital, and ultimately, save the environment and keep the world green. 

#### The full project description along with its list of features and development tools can be found on the [Wiki](https://github.com/harrylimp/EBC/wiki).

## Set-Up & Usage

1. Ensure that [Node.js](https://nodejs.org/en/) and [NPM](https://www.npmjs.com/) are installed.

2. Have a device up and running. This may be an emulator or physical device.
<br/>&nbsp;&nbsp;&nbsp;&nbsp;**Emulator:** To create an emulator, we recommend installing [Android Studio](https://developer.android.com/studio/) and using their emulators. This [tutorial](https://developer.android.com/studio/run/managing-avds) may be useful in setting up an emulator correctly.
<br/>&nbsp;&nbsp;&nbsp;&nbsp;**Physical Device:** Connect a smartphone to the computer that is capable of supporting NFC (a full list of NFC enabled smartphones can be found [here](https://www.unitag.io/nfc/is-my-phone-compatible-with-nfc)). 
<br/>&nbsp;&nbsp;&nbsp;&nbsp;For Android devices, make sure to turn on developer mode before moving on to the next steps. 
<br/>&nbsp;&nbsp;&nbsp;&nbsp;For iOS devices, you will need to purchase an Apple developer subscription before moving on.

3. Clone the project on the local machine

4. Navigate to the project directory in terminal (./EBC)

5. Run `npm install` 

6. Run `react-native run-android` 

7. The project will be available from your device, by default, on the welcome screen.

## Project Structure

Creating components were inherent as part of using React Native. The "src" folder contains the main chunk of the code. This breaks-down into five paths.

### src/Icons
This folder contains all the icons that were utilised. This includes icons such as the home icon, user icon, etc.

### src/components
This is the root folder where all the components were created. It includes higher end components such as the different screens, as well as the implementation of NFC. 

More in-depth documentation can be found [here](https://github.com/harrylimp/EBC/wiki/Project-Structure) as part of the Wiki.

### src/images
All the images used as part of the application is stored in here. This stored regular images as well as GIFs, as cloud storage was yet to be implemented for the current project.

### src/ndef
An adaption of an [existing ndef library](https://www.npmjs.com/package/ndef) created. This code is required to correctly parse the JSON data of the business card into the NFC Data Exchange Format (NDEF). Essentially, it's an encoder/decoder for the business card data before/after it undergoes NFC exchange. It had to be adapted as the original library did not allow parsing that was suitable for the current data.

### src/Router.js
This is the file that sets paths for all the different screens of the project. All screens need to be initalised in this file in order for the router to correctly link to the specified screen after a particular action. 

Here you can also set initial/default paths. For the current project, the initial screen is the welcome screen, where users go through a easy-to-use wizard that creates a digital business card for them.

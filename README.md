#Norea Player App

##Apache Cordova
This is an Apache Cordova project, so make sure [Apache Cordova](https://cordova.apache.org/) is installed before you start.

###Plugins
Norea Player uses the **splashscreen** plugin, the **device** plugin and the **network-information** plugin.

    cordova plugin add org.apache.cordova.splashscreen
    cordova plugin add org.apache.cordova.device
    cordova plugin add org.apache.cordova.network-information

##Building in Android Studio
To build Norea Player App in Android studio there are a few changes that need to be made for it to build sucessfully.

###Change Gradle Verision
The default Gradle version is too low. Change the required gradle version from `0.10` to `1.0.0`. This change has to be made both in `android/build.gradle` and `android/CordovaLib/build.gradle`.

    classpath 'com.android.tools.build:gradle:1.0.0+'

###Change SDK Build tools revision
The default build tools version is `19.0.0`, which is too low. Change the required version to `19.1.0` to make it work. This change has to be made both in `android/build.gradle` and `android/CordovaLib/build.gradle`.

    buildToolsVersion "19.1.0"

##License
There are two different kinds of content in this git, some which you can use freely (MIT) and some which you need our permission to use.

###Logos and linked audio license
All the logos and linked audio are copyrighted by Norea Sverige and cannot be used without permission. Contact [kontoret@noreasverige.se](mailto:kontoret@noreasverige.se) if you want to license our audio and we'll figure something out.

###Code license
All the code is published under the **MIT license** and can be used according to this license.


    The MIT License (MIT)

    Copyright (c) 2015 Norea Sverige

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.

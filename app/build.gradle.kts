plugins {
    alias(libs.plugins.android.application)
}

android {
    namespace = "com.gratus.bspattendance"
    compileSdk = 37

    defaultConfig {
        applicationId = "com.gratus.bspattendance"
        minSdk = 26
        targetSdk = 36
        versionCode = 2
        versionName = "2.0.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_21
        targetCompatibility = JavaVersion.VERSION_21
    }
}

dependencies {
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.appcompat)
    implementation(libs.androidx.coordinatorlayout)

    // Capacitor Native Bridge and Plugins
    implementation(project(":capacitor-android"))
    implementation(project(":capacitor-preferences"))
    implementation(project(":capacitor-filesystem"))
    implementation(project(":capacitor-share"))

    testImplementation(libs.junit)
    androidTestImplementation(libs.androidx.junit)
    androidTestImplementation(libs.androidx.espresso.core)
}
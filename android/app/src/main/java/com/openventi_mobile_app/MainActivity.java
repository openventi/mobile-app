package com.openventi_mobile_app;

import android.content.pm.ActivityInfo;
import android.os.Bundle;
import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "openventi_mobile_app";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
    SplashScreen.show(this);

    super.onCreate(savedInstanceState);
  }
}

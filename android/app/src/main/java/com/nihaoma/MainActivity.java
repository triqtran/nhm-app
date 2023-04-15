package com.nihaoma;

import android.content.Intent;
import android.os.Bundle;
import android.os.PersistableBundle;
import android.speech.tts.TextToSpeech;

import androidx.annotation.Nullable;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

import java.util.Objects;

public class MainActivity extends ReactActivity {

  private static TextToSpeech mTts;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    mTts = new TextToSpeech(this, null);
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "nihaoma";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
   * (aka React 18) with two boolean flags.
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
        this,
            Objects.requireNonNull(getMainComponentName()),
        // If you opted-in for the New Architecture, we enable the Fabric Renderer.
        DefaultNewArchitectureEntryPoint.getFabricEnabled(), // fabricEnabled
        // If you opted-in for the New Architecture, we enable Concurrent React (i.e. React 18).
        DefaultNewArchitectureEntryPoint.getConcurrentReactEnabled() // concurrentRootEnabled
        );
  }

  @Override
  public void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    if (resultCode == TextToSpeech.Engine.CHECK_VOICE_DATA_PASS) {
      // success, create the TTS instance
      mTts = new TextToSpeech(this, null);
    } else {
      // missing data, install it
      Intent installIntent = new Intent();
      installIntent.setAction(
              TextToSpeech.Engine.ACTION_INSTALL_TTS_DATA);
      startActivity(installIntent);
    }
    if (mTts == null) {
      Intent installIntent = new Intent();
      installIntent.setAction(
              TextToSpeech.Engine.ACTION_INSTALL_TTS_DATA);
      startActivity(installIntent);
    }
    mTts = new TextToSpeech(this, null);
  }
}

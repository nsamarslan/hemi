package com.nsamarslan.ucuncugoz;

import android.content.Intent;
import androidx.core.content.ContextCompat;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

/** Starts/stops the foreground service that keeps a guided session playing with the screen off. */
@CapacitorPlugin(name = "SessionService")
public class SessionServicePlugin extends Plugin {
    @PluginMethod
    public void start(PluginCall call) {
        Intent i = new Intent(getContext(), SessionService.class);
        i.putExtra("title", call.getString("title", ""));
        try {
            ContextCompat.startForegroundService(getContext(), i);
            call.resolve();
        } catch (Exception e) {
            call.reject(e.getMessage());
        }
    }

    @PluginMethod
    public void stop(PluginCall call) {
        getContext().stopService(new Intent(getContext(), SessionService.class));
        call.resolve();
    }
}

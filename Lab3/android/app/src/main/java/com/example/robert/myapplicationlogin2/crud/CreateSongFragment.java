package com.example.robert.myapplicationlogin2.crud;

import android.app.AlertDialog;
import android.content.Intent;
import android.support.v4.app.Fragment;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.NumberPicker;

import com.example.robert.myapplicationlogin2.SongListActivity;
import com.example.robert.myapplicationlogin2.R;
import com.example.robert.myapplicationlogin2.database.SongDatabase;
import com.example.robert.myapplicationlogin2.model.SongItem;
import com.example.robert.myapplicationlogin2.utils.ExecutorSingleton;

import java.util.concurrent.ExecutorService;


/**
 * A placeholder fragment containing a simple view.
 */
public class CreateSongFragment extends Fragment {

    private ExecutorService executor = ExecutorSingleton.executor;

    EditText titleEditText;
    EditText details1EditText;
    EditText details2EditText;
    NumberPicker np;
    public CreateSongFragment() {
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.fragment_create_song, container, false);
        np = (NumberPicker) rootView.findViewById(R.id.numberPicker);
        np.setMinValue(1);
        np.setMaxValue(10);
        np.setWrapSelectorWheel(true);

        titleEditText = (EditText) rootView.findViewById(R.id.songTitleEditText);
        details1EditText = (EditText) rootView.findViewById(R.id.songDetails1EditText);
        details2EditText = (EditText) rootView.findViewById(R.id.songDetails2EditText);

        final Runnable createSongTask = new Runnable() {
            @Override
            public void run() {
                String title = titleEditText.getText().toString();
                String details1 = details1EditText.getText().toString();
                String details2 = details2EditText.getText().toString();
                SongItem song = new SongItem(title, details1, details2, np.getValue());
                SongDatabase.getInstance(getContext()).getSongDao().insertSong(song);
            }
        };
        Button createSongBotton = (Button) rootView.findViewById(R.id.createSongButton);
        createSongBotton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                executor.submit(createSongTask);
                AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
                builder.setMessage("redirecting to the song list")
                        .setTitle("success");
                AlertDialog dialog = builder.create();
                dialog.show();
                Intent intent=new Intent(getContext(),SongListActivity.class);
                startActivity(intent);
            }
        });
        return rootView;
    }
}

package com.example.budu.myapplicationlogin2.crud;

import android.app.AlertDialog;
import android.content.Intent;
import android.support.v4.app.Fragment;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.NumberPicker;

import com.example.budu.myapplicationlogin2.SongListActivity;
import com.example.budu.myapplicationlogin2.R;
import com.example.budu.myapplicationlogin2.model.Song;
import com.example.budu.myapplicationlogin2.utils.ExecutorSingleton;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.Query;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.List;
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

        FirebaseDatabase database = FirebaseDatabase.getInstance();
        DatabaseReference myRef = database.getReference();
        final DatabaseReference songsDBreference = myRef.child("songs");

        final Runnable createSongTask = new Runnable() {
            @Override
            public void run() {
                final String title = titleEditText.getText().toString();
                final String details1 = details1EditText.getText().toString();
                final String details2 = details2EditText.getText().toString();

                ValueEventListener vel = new ValueEventListener() {
                    @Override
                    public void onDataChange(DataSnapshot dataSnapshot) {
                        if(dataSnapshot.exists()){
                            List<Song> songs = new ArrayList<>();
                            for(DataSnapshot songEntry: dataSnapshot.getChildren()){
                                Song m = songEntry.getValue(Song.class);
                                songs.add(m);
                                Log.d("fetched song CreateF: ", m.toString());
                            }
                            long id = songs.get(songs.size() - 1).getId() + 1;
                            Song song = new Song(id, title, details1, details2, np.getValue());
                            songsDBreference.child(String.valueOf(id)).setValue(song);
                        }
                    }

                    @Override
                    public void onCancelled(DatabaseError databaseError) {

                    }
                };

                Query query =  songsDBreference.orderByChild("id");
                query.addListenerForSingleValueEvent(vel);
            }
        };

        final FirebaseAuth mAuth = FirebaseAuth.getInstance();

        Button createSongBotton = (Button) rootView.findViewById(R.id.createSongButton);
        createSongBotton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                FirebaseUser user = mAuth.getCurrentUser();
                if(user == null){
                    AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
                    builder.setMessage("Permission denied")
                            .setTitle("Error");
                    AlertDialog dialog = builder.create();
                    dialog.show();
                } else {
                    executor.submit(createSongTask);
                    AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
                    builder.setMessage("redirecting to the song list")
                            .setTitle("success");
                    AlertDialog dialog = builder.create();
                    dialog.show();
                    Intent intent=new Intent(getContext(),SongListActivity.class);
                    startActivity(intent);
                }
            }
        });
        return rootView;
    }
}

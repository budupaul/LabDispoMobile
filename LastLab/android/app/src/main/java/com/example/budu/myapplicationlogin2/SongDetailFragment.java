package com.example.budu.myapplicationlogin2;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.NotificationManager;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.support.design.widget.CollapsingToolbarLayout;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.NotificationCompat;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.NumberPicker;

import com.example.budu.myapplicationlogin2.model.Song;
import com.example.budu.myapplicationlogin2.utils.ExecutorSingleton;
import com.github.mikephil.charting.charts.PieChart;
import com.github.mikephil.charting.data.PieData;
import com.github.mikephil.charting.data.PieDataSet;
import com.github.mikephil.charting.data.PieEntry;
import com.github.mikephil.charting.utils.ColorTemplate;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;

import static android.content.Context.NOTIFICATION_SERVICE;

/**
 * A fragment representing a single Song detail screen.
 * This fragment is either contained in a {@link SongListActivity}
 * in two-pane mode (on tablets) or a {@link SongDetailActivity}
 * on handsets.
 */
public class SongDetailFragment extends Fragment {
    /**
     * The fragment argument representing the item ID that this fragment
     * represents.
     */
    public static final String ARG_ITEM_ID = "item_id";

    /**
     * The dummy title this fragment is presenting.
     */
    private Song mItem;
    private ExecutorService executor = ExecutorSingleton.executor;

    /**
     * Mandatory empty constructor for the fragment manager to instantiate the
     * fragment (e.g. upon screen orientation changes).
     */
    public SongDetailFragment() {
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

//        if (getArguments().containsKey(ARG_ITEM_ID)) {
////            moved all code to onCreateView
//        }
    }

    private void doAfterItemFetched(View rootView) {
        Activity activity = this.getActivity();
        CollapsingToolbarLayout appBarLayout = (CollapsingToolbarLayout) activity.findViewById(R.id.toolbar_layout);
        if (appBarLayout != null) {
            appBarLayout.setTitle(mItem.title);
        }

        EditText et =  rootView.findViewById(R.id.song_detail1);
        et.setText(mItem.details1);

        et.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {
                mItem.details1 = s.toString();
            }

        });

        EditText et2 =  rootView.findViewById(R.id.song_detail2);
        et2.setText(mItem.details2);

        et2.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {
                mItem.details2 = s.toString();
            }
        });

        PieChart pieChartRatings = (PieChart)rootView.findViewById(R.id.pieChartRatings);
        pieChartRatings.setCenterText("Ratings chart");
        try {
            pieChartRatings.setData(generatePieData());
        } catch (ExecutionException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        NumberPicker np = (NumberPicker) rootView.findViewById(R.id.numberPickerRating);
        np.setMaxValue(10);
        np.setMinValue(1);
        np.setValue(mItem.rating);

        np.setOnValueChangedListener(new NumberPicker.OnValueChangeListener() {
            @Override
            public void onValueChange(NumberPicker picker, int oldVal, int newVal) {
                mItem.rating = newVal;
            }
        });
    }

    @Override
    public View onCreateView(final LayoutInflater inflater, final ViewGroup container,
                             final Bundle savedInstanceState) {
        final View rootView = inflater.inflate(R.layout.song_detail, container, false);

        FirebaseDatabase database = FirebaseDatabase.getInstance();
        DatabaseReference myRef = database.getReference();
        final DatabaseReference songsDBreference = myRef.child("songs");

        Log.d("id of item to be retrv", String.valueOf(getArguments().getLong(ARG_ITEM_ID)));
        songsDBreference.child(String.valueOf(getArguments().getLong(ARG_ITEM_ID))).addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                mItem = dataSnapshot.getValue(Song.class);
                Log.d("song to be detailed", mItem.toString());
                doAfterItemFetched(rootView);
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }
        });

        final Context context  = this.getContext();
        final NotificationManager mNotifyMgr = (NotificationManager) getContext().getSystemService(NOTIFICATION_SERVICE);

        final Runnable updateSongTask = new Runnable() {
            @Override
            public void run() {
                songsDBreference.child(String.valueOf(getArguments().getLong(ARG_ITEM_ID))).setValue(mItem);
                NotificationCompat.Builder mBuilder =
                        new NotificationCompat.Builder(context)
                                .setSmallIcon(R.drawable.ic_notification_alert)
                                .setContentTitle("Song updated")
                                .setContentText(mItem.toString());
                int mNotificationId = 001;
                mNotifyMgr.notify(mNotificationId, mBuilder.build());
            }
        };
        final Runnable deleteSongTask = new Runnable() {
            @Override
            public void run() {
                songsDBreference.child(String.valueOf(getArguments().getLong(ARG_ITEM_ID))).removeValue();
                NotificationCompat.Builder mBuilder =
                        new NotificationCompat.Builder(context)
                                .setSmallIcon(R.drawable.ic_notification_alert)
                                .setContentTitle("Song deleted")
                                .setContentText("id: " + mItem.id);
                int mNotificationId = 002;
                mNotifyMgr.notify(mNotificationId, mBuilder.build());
            }
        };

        final FirebaseAuth mAuth = FirebaseAuth.getInstance();

        Button saveSongButton = rootView.findViewById(R.id.buttonSaveSongItem);
        saveSongButton.setOnClickListener(new View.OnClickListener() {
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
                    executor.submit(updateSongTask);
                }
            }
        });

        Button deleteSongButton = rootView.findViewById(R.id.buttonDeleteSongItem);
        deleteSongButton.setOnClickListener(new View.OnClickListener() {
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
                    executor.submit(deleteSongTask);
                    Intent intent=new Intent(getContext(),SongListActivity.class);
                    startActivity(intent);
                }
            }
        });

        return rootView;
    }

    private PieData generatePieData() throws ExecutionException, InterruptedException {
//        Callable<List<SongItem>> getSongsTask = new Callable<List<SongItem>>() {
//            @Override
//            public List<SongItem> call() throws Exception {
//                    return SongDatabase.getInstance(getContext()).getSongDao().loadAllSongs();
//            }
//        };
//        Future<List<SongItem>> futureSongs = executor.submit(getSongsTask);
//
//        ArrayList<Integer> ratings = new ArrayList<>();
//        for (int i = 0; i < 10; i++) {
//            ratings.add(0);
//        }
        ArrayList<PieEntry> entries1 = new ArrayList<PieEntry>();
//
//        List<SongItem> songs = futureSongs.get();
//
//        for(SongItem m: songs){
//            ratings.set(m.rating, ratings.get(m.rating));
//        }

        //TB added real data
        for(int i = 0; i < 4; i++) {
            entries1.add(new PieEntry((float) ((Math.random() * 60) + 40), "Quarter " + (i+1)));
        }

        PieDataSet ds1 = new PieDataSet(entries1, "Ratings distributed amongst songs");
        ds1.setColors(ColorTemplate.VORDIPLOM_COLORS);
        ds1.setSliceSpace(2f);
        ds1.setValueTextColor(Color.WHITE);
        ds1.setValueTextSize(12f);

        PieData d = new PieData(ds1);
        return d;
    }


}

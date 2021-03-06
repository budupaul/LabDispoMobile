package com.example.robert.myapplicationlogin2;

import android.app.Activity;
import android.content.Intent;
import android.graphics.Color;
import android.support.design.widget.CollapsingToolbarLayout;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.NumberPicker;
import com.github.mikephil.charting.charts.PieChart;

import com.github.mikephil.charting.data.PieData;

import com.github.mikephil.charting.data.PieDataSet;

import com.github.mikephil.charting.data.PieEntry;

import com.github.mikephil.charting.utils.ColorTemplate;
import com.example.robert.myapplicationlogin2.database.SongDatabase;
import com.example.robert.myapplicationlogin2.model.SongItem;
import com.example.robert.myapplicationlogin2.utils.ExecutorSingleton;

import java.util.ArrayList;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Future;

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
    private SongItem mItem;
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

        if (getArguments().containsKey(ARG_ITEM_ID)) {
            // Load the dummy title specified by the fragment
            // arguments. In a real-world scenario, use a Loader
            // to load title from a title provider.

            Callable<SongItem> getSongTask = new Callable<SongItem>() {
                @Override
                public SongItem call() {
                    return SongDatabase.getInstance(getContext()).getSongDao().getSongById(getArguments().getLong(ARG_ITEM_ID));
                }
            };

            Future<SongItem> future = executor.submit(getSongTask);
            try {
                mItem = future.get();
            } catch (InterruptedException e) {
                e.printStackTrace();
            } catch (ExecutionException e) {
                e.printStackTrace();
            }

            Activity activity = this.getActivity();
            CollapsingToolbarLayout appBarLayout = (CollapsingToolbarLayout) activity.findViewById(R.id.toolbar_layout);
            if (appBarLayout != null) {
                appBarLayout.setTitle(mItem.title);
            }
        }

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.song_detail, container, false);

        // Show the dummy title as text in a TextView.
        if (mItem != null) {
            PieChart pieChartRatings = (PieChart)rootView.findViewById(R.id.pieChartRatings);

            pieChartRatings.setCenterText("This is a chart");

            try {

                pieChartRatings.setData(generatePieData());

            } catch (ExecutionException e) {

                e.printStackTrace();

            } catch (InterruptedException e) {

                e.printStackTrace();

            }

            final Runnable updateSongTask = new Runnable() {
                @Override
                public void run() {
                    SongDatabase.getInstance(getContext()).getSongDao().updateSong(mItem);
                    System.out.println(SongDatabase.getInstance(getContext()).getSongDao().getSongById(mItem.id));
                }
            };
            final Runnable deleteSongTask = new Runnable() {
                @Override
                public void run() {
                    SongDatabase.getInstance(getContext()).getSongDao().deleteSong(mItem);
                }
            };

            Button saveSongButton = rootView.findViewById(R.id.buttonSaveSongItem);
            saveSongButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    executor.submit(updateSongTask);
                }
            });

            Button deleteSongButton = rootView.findViewById(R.id.buttonDeleteSongItem);
            deleteSongButton.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    executor.submit(deleteSongTask);
                    Intent intent=new Intent(getContext(),SongListActivity.class);
                    startActivity(intent);
                }
            });
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

        return rootView;
    }

    private PieData generatePieData() throws ExecutionException, InterruptedException {

//        Callable<List<MovieItem>> getMoviesTask = new Callable<List<MovieItem>>() {

//            @Override

//            public List<MovieItem> call() throws Exception {

//                    return MovieDatabase.getInstance(getContext()).getMovieDao().loadAllMovies();

//            }

//        };

//        Future<List<MovieItem>> futureMovies = executor.submit(getMoviesTask);

//

//        ArrayList<Integer> ratings = new ArrayList<>();

//        for (int i = 0; i < 10; i++) {

//            ratings.add(0);

//        }

        ArrayList<PieEntry> entries1 = new ArrayList<PieEntry>();

//

//        List<MovieItem> movies = futureMovies.get();

//

//        for(MovieItem m: movies){

//            ratings.set(m.rating, ratings.get(m.rating));

//        }



        //TB added real data

        for(int i = 0; i < 2; i++) {

            entries1.add(new PieEntry((float) ((Math.random() * 60) + 40), "Half " + (i+1)));

        }



        PieDataSet ds1 = new PieDataSet(entries1, "Ratings distributed amongst movies");

        ds1.setColors(ColorTemplate.VORDIPLOM_COLORS);

        ds1.setSliceSpace(2f);

        ds1.setValueTextColor(Color.WHITE);

        ds1.setValueTextSize(12f);



        PieData d = new PieData(ds1);

        return d;

    }
}

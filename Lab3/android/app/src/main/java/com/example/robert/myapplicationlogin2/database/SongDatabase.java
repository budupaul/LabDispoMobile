package com.example.robert.myapplicationlogin2.database;

import android.arch.persistence.room.Database;
import android.arch.persistence.room.Room;
import android.arch.persistence.room.RoomDatabase;
import android.content.Context;

import com.example.robert.myapplicationlogin2.dao.SongDao;
import com.example.robert.myapplicationlogin2.model.SongItem;

/**
 * Created by budu on 07.12.2017.
 */

@Database(entities = { SongItem.class }, version = 3)
public abstract class SongDatabase extends RoomDatabase {

    private static final String DB_NAME = "songDatabase.db";
    private static volatile SongDatabase instance;

    public static synchronized SongDatabase getInstance(Context context) {
        if (instance == null) {
            instance = create(context);
        }
        return instance;
    }

    private static SongDatabase create(final Context context) {
        return Room.databaseBuilder(
                context,
                SongDatabase.class,
                DB_NAME).fallbackToDestructiveMigration().build();
    }

    public abstract SongDao getSongDao();
}

package com.example.robert.myapplicationlogin2.dao;

import android.arch.persistence.room.Dao;
import android.arch.persistence.room.Delete;
import android.arch.persistence.room.Insert;
import android.arch.persistence.room.Query;
import android.arch.persistence.room.Update;

import com.example.robert.myapplicationlogin2.model.SongItem;

import java.util.List;

/**
 * Created by robert on 07.12.2017.
 */
@Dao
public interface SongDao {
    @Insert
    public long insertSong(SongItem song);
    @Update
    public int  updateSong(SongItem song);
    @Delete
    public void deleteSong(SongItem song);

    @Query("Delete from SongItem")
    public void deleteAllSongs();

    @Query("SELECT * FROM SongItem")
    public List<SongItem> loadAllSongs();

    @Query("SELECT * FROM SongItem WHERE id=:id")
    public SongItem getSongById(long id);

    @Query("SELECT * FROM SongItem WHERE rating=:rating")
    public List<SongItem> getSongsByRating(int rating);

}

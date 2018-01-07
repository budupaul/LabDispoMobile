package com.example.budu.myapplicationlogin2.model;

/**
 * Created by budu on 05.01.2018.
 */

public class Song {
    public long id;
    public String title;
    public String details1;
    public String details2;
    public int rating;

    public Song() {
    }

    public Song(long id, String title, String details1, String details2, int rating) {
        this.id = id;
        this.title = title;
        this.details1 = details1;
        this.details2 = details2;
        this.rating = rating;
    }

    public Song(String title, String details1, String details2, int rating) {
        this.title = title;
        this.details1 = details1;
        this.details2 = details2;
        this.rating = rating;
    }

    @Override
    public String toString() {
        return "Song{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", details1='" + details1 + '\'' +
                ", details2='" + details2 + '\'' +
                ", rating=" + rating +
                '}';
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDetails1() {
        return details1;
    }

    public void setDetails1(String details1) {
        this.details1 = details1;
    }

    public String getDetails2() {
        return details2;
    }

    public void setDetails2(String details2) {
        this.details2 = details2;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }
}

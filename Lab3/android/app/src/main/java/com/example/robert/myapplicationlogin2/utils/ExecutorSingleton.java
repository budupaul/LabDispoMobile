package com.example.robert.myapplicationlogin2.utils;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Created by robert on 07.12.2017.
 */

public interface  ExecutorSingleton {
    ExecutorService executor = Executors.newFixedThreadPool(4);
}

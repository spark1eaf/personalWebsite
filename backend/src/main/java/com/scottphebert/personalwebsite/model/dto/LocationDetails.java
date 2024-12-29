package com.scottphebert.personalwebsite.model.dto;

public class LocationDetails {
    private String sunrise;
    private String lng;
    private String gmtOffset;
    private String rawOffset;
    private String sunset;
    private String timezoneId;
    private String dstOffset;
    private String countryName;
    private String time;
    private String lat;

    public String getSunrise() {
        return sunrise;
    }

    public void setSunrise(String sunrise) {
        this.sunrise = sunrise;
    }

    public String getLng() {
        return lng;
    }

    public void setLng(String lng) {
        this.lng = lng;
    }

    public String getGmtOffset() {
        return gmtOffset;
    }

    public void setGmtOffset(String gmtOffset) {
        this.gmtOffset = gmtOffset;
    }

    public String getRawOffset() {
        return rawOffset;
    }

    public void setRawOffset(String rawOffset) {
        this.rawOffset = rawOffset;
    }

    public String getSunset() {
        return sunset;
    }

    public void setSunset(String sunset) {
        this.sunset = sunset;
    }

    public String getTimezoneId() {
        return timezoneId;
    }

    public void setTimezoneId(String timezoneId) {
        this.timezoneId = timezoneId;
    }

    public String getDstOffset() {
        return dstOffset;
    }

    public void setDstOffset(String dstOffset) {
        this.dstOffset = dstOffset;
    }

    public String getCountryName() {
        return countryName;
    }

    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getLat() {
        return lat;
    }

    public void setLat(String lat) {
        this.lat = lat;
    }
}

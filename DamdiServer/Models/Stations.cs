using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DamdiServer.Models
{
    public class Stations
    {
        int station_code;
        string city;
        string address;
        DateTime start_time;
        DateTime end_time;
        float lat;
        float lng;

        public Stations(int station_code, string city, string address, DateTime start_time, DateTime end_time, float lat, float lng)
        {
            Station_code = station_code;
            City = city;
            Address = address;
            Start_time = start_time;
            End_time = end_time;
            Lat = lat;
            Lng = lng;
        }

        public int Station_code { get => station_code; set => station_code = value; }
        public string City { get => city; set => city = value; }
        public string Address { get => address; set => address = value; }
        public DateTime Start_time { get => start_time; set => start_time = value; }
        public DateTime End_time { get => end_time; set => end_time = value; }
        public float Lat { get => lat; set => lat = value; }
        public float Lng { get => lng; set => lng = value; }


    }
}
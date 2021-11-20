using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DamdiServer.Models
{
    public class Stations
    {
        int station_code;
        string station_name;
        string city;
        string f_address;
        TimeSpan start_time;
        TimeSpan end_time;
        string lat;
        string lng;
        string days;

        public Stations(int station_code, string station_name, string city, string f_address, TimeSpan start_time, TimeSpan end_time, string lat, string lng,string days)
        {
            Station_code = station_code;
            Station_name = station_name;
            City = city;
            F_address = f_address;
            Start_time = start_time;
            End_time = end_time;
            Lat = lat;
            Lng = lng;
            Days = days;
        }

        public int Station_code { get => station_code; set => station_code = value; }
        public string City { get => city; set => city = value; }
        public string F_address { get => f_address; set => f_address = value; }
        public TimeSpan Start_time { get => start_time; set => start_time = value; }
        public TimeSpan End_time { get => end_time; set => end_time = value; }
        public string Lat { get => lat; set => lat = value; }
        public string Lng { get => lng; set => lng = value; }
        public string Days { get => days; set => days = value; }
        public string Station_name { get => station_name; set => station_name = value; }
    }
}
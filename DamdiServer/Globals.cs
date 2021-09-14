using DamdiServer.Controllers;
using DamdiServer.DAL;
using DamdiServer.Models;
using System.Configuration;


namespace DamdiServer
{
    public static class Globals
    {
        //initializing data access layer with sql server before start the work between client side and backnd side.
        #region ctor
        static readonly string conStr;
        static Globals()
        {

            bool localWebAPI = false;//before doing publish need to be false
            bool SqlLocal = false;//before doing publish need to be false
            if (localWebAPI && SqlLocal)
                conStr = ConfigurationManager.ConnectionStrings["LocalDB"].ConnectionString;
            else
                conStr = ConfigurationManager.ConnectionStrings["LIVEDNSfromLivedns"].ConnectionString;
            UserDAL = new UserDAL(conStr);
        }
        #endregion

        #region Controllers
        public static UserController UserController { get; set; }
        public static ManagerController ManagerController { get; set; }
        public static DonatorsController DonatorsController { get; set; }
        public static StationsController StationsController { get; set; }
        public static AppointmentsController AppointmentsController { get; set; }
        #endregion

        #region DAL
        public static UserDAL UserDAL { get; set; }
        public static ManagerDAL ManagerDAL { get; set; }
        public static DonatorsDAL DonatorsDAL { get; set; }
        public static StationsDAL StationsDAL { get; set; }
        public static AppointmentsDAL AppointmentsDAL { get; set; }
        #endregion

        #region Models
        public static User User { get; set; }
        public static MedicalInfoDonation MedicalInfoDonation { get; set; }
        public static MedicalInfoDonator medicalInfoDonator { get; set; }
        public static Donations Donations { get; set; }
        public static Donators Donators { get; set; }
        public static Manager Manager { get; set; }
        public static Stations Stations { get; set; }
        public static Appointments Appointments { get; set; }

        #endregion

    }
}
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
            DonatorsDAL = new DonatorsDAL(conStr);
            AdminDAL = new AdminDAL(conStr);
            AppointmentsDAL = new AppointmentsDAL(conStr);
            StationsDAL = new StationsDAL(conStr);
            MedicalInfoDAL = new MedicalInfoDAL(conStr);
            ValidFormDAL = new ValidFormDAL(conStr);
            DonationDAL = new DonationDAL(conStr);
        }
        #endregion

        #region DAL
        public static UserDAL UserDAL { get; set; }
        public static AdminDAL AdminDAL { get; set; }
        public static DonatorsDAL DonatorsDAL { get; set; }
        public static StationsDAL StationsDAL { get; set; }
        public static AppointmentsDAL AppointmentsDAL { get; set; }
        public static MedicalInfoDAL MedicalInfoDAL { get; set; }
        public static ValidFormDAL ValidFormDAL { get; set; }
        public static DonationDAL DonationDAL { get; set; }

        #endregion

    }
}
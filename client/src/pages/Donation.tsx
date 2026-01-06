import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Heart, CheckCircle } from "lucide-react";

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const donationTypes = [
  { valueEn: "General Donation", valueHi: "सामान्य दान" },
  { valueEn: "Temple Construction", valueHi: "मंदिर निर्माण" },
  { valueEn: "Annadaan (Food Donation)", valueHi: "अन्नदान" },
  { valueEn: "Gaushala (Cow Shelter)", valueHi: "गौशाला" },
  { valueEn: "Education Fund", valueHi: "शिक्षा निधि" },
  { valueEn: "Festival Celebration", valueHi: "त्योहार उत्सव" },
];

export default function Donation() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [showSuccess, setShowSuccess] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    state: "",
    city: "",
    pincode: "",
    address: "",
    donationType: "",
    amount: "",
  });

  const donationMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return apiRequest("POST", "/api/donations", data);
    },
    onSuccess: () => {
      setShowSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        state: "",
        city: "",
        pincode: "",
        address: "",
        donationType: "",
        amount: "",
      });
      setAgreeTerms(false);
    },
    onError: () => {
      toast({
        title: t("Error", "त्रुटि"),
        description: t("Failed to submit donation. Please try again.", "दान जमा करने में विफल। कृपया पुन: प्रयास करें।"),
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      toast({
        title: t("Please agree to Terms and Conditions", "कृपया नियम और शर्तों से सहमत हों"),
        variant: "destructive",
      });
      return;
    }
    donationMutation.mutate(formData);
  };

  const isFormValid = formData.firstName && formData.lastName && formData.phone && 
    formData.email && formData.state && formData.city && formData.donationType && 
    formData.amount && agreeTerms;

  if (showSuccess) {
    return (
      <div className="min-h-screen flex flex-col" data-testid="page-donation">
        <Header />
        <main className="flex-1 flex items-center justify-center bg-gradient-to-b from-primary/10 to-background py-16">
          <Card className="max-w-lg mx-4 text-center">
            <CardContent className="p-8">
              <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {t("Thank You!", "धन्यवाद!")}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {t(
                  "We sincerely thank you for your kind donation and your commendable efforts toward the service of Sanatan Dharma.",
                  "हम आपके उदार दान और सनातन धर्म की सेवा के प्रति आपके सराहनीय प्रयासों के लिए आपको हार्दिक धन्यवाद देते हैं।"
                )}
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                {t(
                  "Our team will contact you shortly to complete the donation process.",
                  "हमारी टीम दान प्रक्रिया पूरी करने के लिए जल्द ही आपसे संपर्क करेगी।"
                )}
              </p>
              <Button onClick={() => setShowSuccess(false)} data-testid="button-donate-again">
                {t("Make Another Donation", "एक और दान करें")}
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" data-testid="page-donation">
      <Header />
      <main className="flex-1 bg-gradient-to-b from-primary/10 to-background py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2" data-testid="text-donation-title">
              {t("Make a Donation", "दान करें")}
            </h1>
            <p className="text-muted-foreground">
              {t(
                "Support the temple and contribute to the service of Sanatan Dharma",
                "मंदिर का समर्थन करें और सनातन धर्म की सेवा में योगदान दें"
              )}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <Card className="mb-6">
              <CardHeader className="bg-primary text-white rounded-t-lg">
                <h2 className="font-bold text-lg">{t("Customer Details", "ग्राहक विवरण")}</h2>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-4">{t("Personal Information", "व्यक्तिगत जानकारी")}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">
                        {t("Phone Number", "फ़ोन नंबर")} <span className="text-destructive">*</span>
                      </label>
                      <Input
                        placeholder={t("Enter Mobile Number", "मोबाइल नंबर दर्ज करें")}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        data-testid="input-donation-phone"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">
                        {t("First Name", "पहला नाम")} <span className="text-destructive">*</span>
                      </label>
                      <Input
                        placeholder={t("Enter First Name", "पहला नाम दर्ज करें")}
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        data-testid="input-donation-firstname"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">
                        {t("Last Name", "अंतिम नाम")} <span className="text-destructive">*</span>
                      </label>
                      <Input
                        placeholder={t("Enter Last Name", "अंतिम नाम दर्ज करें")}
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        data-testid="input-donation-lastname"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">
                        {t("Email Address", "ईमेल पता")} <span className="text-destructive">*</span>
                      </label>
                      <Input
                        type="email"
                        placeholder={t("Enter Email", "ईमेल दर्ज करें")}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        data-testid="input-donation-email"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      {t("State", "राज्य")} <span className="text-destructive">*</span>
                    </label>
                    <Select
                      value={formData.state}
                      onValueChange={(value) => setFormData({ ...formData, state: value })}
                    >
                      <SelectTrigger data-testid="select-donation-state">
                        <SelectValue placeholder={t("Select Your State", "अपना राज्य चुनें")} />
                      </SelectTrigger>
                      <SelectContent>
                        {indianStates.map((state) => (
                          <SelectItem key={state} value={state}>{state}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      {t("City", "शहर")} <span className="text-destructive">*</span>
                    </label>
                    <Input
                      placeholder={t("Enter City", "शहर दर्ज करें")}
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      data-testid="input-donation-city"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      {t("Pincode", "पिनकोड")}
                    </label>
                    <Input
                      placeholder={t("Enter Pincode", "पिनकोड दर्ज करें")}
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      data-testid="input-donation-pincode"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground">
                    {t("Address", "पता")}
                  </label>
                  <Textarea
                    placeholder={t("Enter Address", "पता दर्ज करें")}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows={3}
                    data-testid="input-donation-address"
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-4">{t("Donation Details", "दान विवरण")}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">
                        {t("Donation Type", "दान प्रकार")} <span className="text-destructive">*</span>
                      </label>
                      <Select
                        value={formData.donationType}
                        onValueChange={(value) => setFormData({ ...formData, donationType: value })}
                      >
                        <SelectTrigger data-testid="select-donation-type">
                          <SelectValue placeholder={t("Select Donation Type", "दान प्रकार चुनें")} />
                        </SelectTrigger>
                        <SelectContent>
                          {donationTypes.map((type) => (
                            <SelectItem key={type.valueEn} value={type.valueEn}>
                              {t(type.valueEn, type.valueHi)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">
                        {t("Donation Amount", "दान राशि")} <span className="text-destructive">*</span>
                      </label>
                      <Input
                        type="number"
                        placeholder={t("Enter Donation Amount", "दान राशि दर्ज करें")}
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        data-testid="input-donation-amount"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="terms"
                    checked={agreeTerms}
                    onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                    data-testid="checkbox-donation-terms"
                  />
                  <label htmlFor="terms" className="text-sm text-foreground cursor-pointer">
                    {t("I agree to the ", "मैं ")}<span className="text-primary font-medium">{t("Terms and Conditions", "नियम और शर्तों")}</span>{t("", " से सहमत हूं")}
                  </label>
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button
                type="submit"
                size="lg"
                disabled={!isFormValid || donationMutation.isPending}
                className="px-12"
                data-testid="button-donate-now"
              >
                {donationMutation.isPending 
                  ? t("Submitting...", "जमा हो रहा है...") 
                  : t("DONATE NOW", "अभी दान करें")}
              </Button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

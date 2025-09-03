import { PhoneCall, Store, MapPin, Clock } from "lucide-react";

interface StoreHeaderProps {
  storeName?: string;
  storeDescription?: string;
  websiteUrl?: string;
  phoneNumber?: string;
  address?: string;
  weekdayHours?: string;
  weekendHours?: string;
  className?: string;
}

export default function StoreHeader({
  storeName = "Giuseppe's Italian Kitchen",
  storeDescription = "Authentic Italian cuisine made with fresh, locally sourced ingredients. Family recipes passed down through generations.",
  websiteUrl = "www.giuseppes.com",
  phoneNumber = "(555) 123-4567",
  address = "123 Main Street, Downtown, NY 10001",
  weekdayHours = "Mon-Fri: 11:00 AM - 10:00 PM",
  weekendHours = "Sat-Sun: 10:00 AM - 11:00 PM",
  className = ""
}: StoreHeaderProps) {
  return (
    <div className={`bg-card border-b border-border p-6 ${className}`}>
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Store Logo */}
        <div className="flex-shrink-0">
          <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-muted flex items-center justify-center">
            <Store className="w-8 h-8 lg:w-10 lg:h-10 text-muted-foreground" />
          </div>
        </div>

        {/* Store Information */}
        <div className="flex-1 min-w-0 !w-[320px] !h-full">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
            {storeName}
          </h1>
          <p className="text-muted-foreground text-sm lg:text-base leading-relaxed">
            {storeDescription}
          </p>
        </div>

        {/* Contact Information */}
        <div className="flex-shrink-0 lg:w-80">
          <div className="space-y-4">
            {/* Website */}
            <div className="flex items-start gap-3">
              <Store className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm font-medium text-foreground">Website</div>
                <a
                  href={`https://${websiteUrl}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer">

                  {websiteUrl}
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3">
              <PhoneCall className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm font-medium text-foreground">Phone</div>
                <a
                  href={`tel:${phoneNumber}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors">

                  {phoneNumber}
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm font-medium text-foreground">Address</div>
                <div className="text-sm text-muted-foreground">
                  {address}
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm font-medium text-foreground">Hours</div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>{weekdayHours}</div>
                  <div>{weekendHours}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

}
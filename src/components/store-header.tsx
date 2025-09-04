import { PhoneCall, Store, MapPin, Clock, ExternalLink } from "lucide-react";

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
          <div className="bg-secondary/30 rounded-xl p-5 space-y-5">
            <div className="text-base font-semibold text-foreground mb-4">Contact Information</div>
            
            {/* Website */}
            <div className="group flex items-start gap-4 p-3 rounded-lg hover:bg-white/80 transition-all duration-200 hover:shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <Store className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-foreground mb-1">Website</div>
                <a
                  href={`https://${websiteUrl}`}
                  className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors font-medium group/link"
                  target="_blank"
                  rel="noopener noreferrer">
                  <span className="truncate">{websiteUrl}</span>
                  <ExternalLink className="w-3 h-3 opacity-60 group-hover/link:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="group flex items-start gap-4 p-3 rounded-lg hover:bg-white/80 transition-all duration-200 hover:shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <PhoneCall className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-foreground mb-1">Phone</div>
                <a
                  href={`tel:${phoneNumber}`}
                  className="text-sm text-primary hover:text-primary/80 transition-colors font-medium">
                  {phoneNumber}
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="group flex items-start gap-4 p-3 rounded-lg hover:bg-white/80 transition-all duration-200 hover:shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-foreground mb-1">Address</div>
                <div className="text-sm text-muted-foreground leading-relaxed">
                  {address}
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="group flex items-start gap-4 p-3 rounded-lg hover:bg-white/80 transition-all duration-200 hover:shadow-sm">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-foreground mb-1">Hours</div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Weekdays</span>
                    <span>{weekdayHours.split(': ')[1]}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Weekends</span>
                    <span>{weekendHours.split(': ')[1]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

}
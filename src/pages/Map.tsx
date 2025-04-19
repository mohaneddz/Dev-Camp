// src/components/MapWithInfo.tsx (or your main page component)
import React, { useState, useCallback, useEffect } from 'react';
import SearchInput from '@/components/search-input'; // Adjust path
import AlgeriaMap from '@/components/algeria-map';   // Adjust path - ENSURE THIS IS THE POPULATION-BASED VERSION
// import InfoContainer from '@/components/info-container'; // Adjust path
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { useTheme } from 'next-themes'; // Optional: for theme-based styling
import { Button } from "@/components/ui/button";
import { MapPin, Lock, Check, Hash, X, User, Building2, Globe2, Tag, ChevronLeft, ChevronRight, Users, TrendingUp, Package } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface LocationData {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    wilaya: string;
    status: 'normal' | 'warning' | 'alert';
    owner: {
        name: string;
        domains: string[];
    };
}

// Helper function to generate mock data for the info panel
const generateLocationData = (locationId: string, wilaya: string, status: 'normal' | 'warning' | 'alert'): LocationData => {
    // Generate random business owner data
    const owners = [
        { name: "Ahmed Benali", domains: ["Electronics", "Home Appliances"] },
        { name: "Fatima Zohra", domains: ["Clothing", "Accessories"] },
        { name: "Karim Boudiaf", domains: ["Food", "Beverages"] },
        { name: "Nadia Bouazza", domains: ["Furniture", "Home Decor"] },
        { name: "Mohamed Chérif", domains: ["Automotive", "Parts"] }
    ];
    const randomOwner = owners[Math.floor(Math.random() * owners.length)];

    // Attempt to parse Lat/Lng from ID if needed for display, otherwise can ignore
    let parsedLat = 0;
    let parsedLng = 0;
    
    const parts = locationId.split('_');
    if (parts.length >= 3) {
        parsedLat = parseFloat(parts[1]);
        parsedLng = parseFloat(parts[2]);
    }

    return {
        id: locationId,
        name: `Business Location #${locationId.split('_')[1].slice(0, 4)}`,
        latitude: isNaN(parsedLat) ? 0 : parsedLat,
        longitude: isNaN(parsedLng) ? 0 : parsedLng,
        wilaya: wilaya,
        status: status,
        owner: randomOwner
    };
};

// Extract latitude and longitude from the ID
const extractLatLongFromId = (id: any) => {
  const parts = id.split('_');
  if (parts.length === 3) {
    const latitude = parseFloat(parts[1]);
    const longitude = parseFloat(parts[2]);
    return { latitude, longitude };
  }
  return { latitude: null, longitude: null };
};

// Use the ID to define latitude and longitude
const id = "Delivery_33.7442_1.0365";
const { latitude, longitude } = extractLatLongFromId(id);

const locationData = {
  latitude: 36.7525, // Roll back
  longitude: 3.04197, // Roll back
};

const locationDetails = {
  latitude: latitude !== null ? latitude.toFixed(4) : 'N/A',
  longitude: longitude !== null ? longitude.toFixed(4) : 'N/A',
};

// Update icons for latitude and longitude
const LatitudeIcon = () => <Hash size={12} className="text-primary" />;
const LongitudeIcon = () => <Hash size={12} className="text-primary" />;

// Update the InfoContainer component to show the new data structure
const InfoContainer = ({ data, onClear }: { data: LocationData, onClear: () => void }) => {
    return (
        <Card className="border w-full lg:w-[25vw] bg-card/50 text-card-foreground shadow-sm">
            <CardHeader className="p-3">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-primary" />
                        Location Details
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={onClear} className="hover:bg-destructive/10">
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-3 space-y-4">
                <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 rounded-lg bg-primary/5">
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">Business Owner</span>
                        </div>
                        <span className="text-sm font-semibold text-primary">{data.owner.name}</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-2 rounded-lg bg-secondary/5">
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-secondary" />
                            <span className="text-sm font-medium">Wilaya</span>
                        </div>
                        <span className="text-sm font-semibold text-secondary">{data.wilaya}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div className="flex justify-between items-center p-2 rounded-lg bg-tertiary/5">
                            <div className="flex items-center gap-2">
                                <Globe2 className="h-4 w-4 text-tertiary" />
                                <span className="text-sm font-medium">Latitude</span>
                            </div>
                            <span className="text-sm font-semibold text-tertiary">{data.latitude.toFixed(4)}</span>
                        </div>
                        <div className="flex justify-between items-center p-2 rounded-lg bg-tertiary/5">
                            <div className="flex items-center gap-2">
                                <Globe2 className="h-4 w-4 text-tertiary" />
                                <span className="text-sm font-medium">Longitude</span>
                            </div>
                            <span className="text-sm font-semibold text-tertiary">{data.longitude.toFixed(4)}</span>
                        </div>
                    </div>

                    <div className="space-y-2 p-2 rounded-lg bg-primary/5">
                        <div className="flex items-center gap-2">
                            <Tag className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">Business Domains</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                            {data.owner.domains.map((domain, index) => (
                                <Badge 
                                    key={index} 
                                    variant="secondary" 
                                    className="text-xs bg-primary/10 hover:bg-primary/20 text-primary"
                                >
                                    {domain}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
                
                {/* Additional Statistics */}
                <div className="grid grid-cols-3 gap-2 mt-4">
                    <div className="flex flex-col items-center p-2 rounded-lg bg-success/5">
                        <Users className="h-4 w-4 text-success" />
                        <span className="text-xs font-medium mt-1">Customers</span>
                        <span className="text-sm font-semibold text-success">1.2K</span>
                    </div>
                    <div className="flex flex-col items-center p-2 rounded-lg bg-warning/5">
                        <TrendingUp className="h-4 w-4 text-warning" />
                        <span className="text-xs font-medium mt-1">Growth</span>
                        <span className="text-sm font-semibold text-warning">+15%</span>
                    </div>
                    <div className="flex flex-col items-center p-2 rounded-lg bg-info/5">
                        <Package className="h-4 w-4 text-info" />
                        <span className="text-xs font-medium mt-1">Products</span>
                        <span className="text-sm font-semibold text-info">45</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="p-3 flex justify-between items-center border-t">
                <Button variant="ghost" size="sm" className="hover:bg-primary/10">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                </Button>
                <Button variant="ghost" size="sm" className="hover:bg-primary/10">
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
            </CardFooter>
        </Card>
    );
};

// Update the marker colors in the AlgeriaMap component
const getMarkerColor = (status: 'normal' | 'warning' | 'alert') => {
    switch (status) {
        case 'normal':
            return 'var(--color-primary)';
        case 'warning':
            return 'var(--color-warning)';
        case 'alert':
            return 'var(--color-destructive)';
        default:
            return 'var(--color-primary)';
    }
};

export default function Map() {

    const [searchQuery, setSearchQuery] = useState<string>('');
    const [zoomLevel, setZoomLevel] = useState<number>(6); // Initial zoom
    const [selectedLocationId, setSelectedLocationId] = useState<string | null>(null); 
    const [locationData, setLocationData] = useState<LocationData | null>(null);
    const [selectedWilaya, setSelectedWilaya] = useState<string | null>(null);
    const [siteSelectionMode, setSiteSelectionMode] = useState<boolean>(false);
    const [siteSelected, setSiteSelected] = useState<boolean>(false); 

    const { theme } = useTheme(); // Optional theming
    const isDark = theme === 'dark'; // Example usage

    // Load site selection state from sessionStorage on component mount
    useEffect(() => {
        const savedSiteSelected = sessionStorage.getItem('mapSiteSelected');
        const savedLocationId = sessionStorage.getItem('mapSelectedLocationId');
        const savedLocationData = sessionStorage.getItem('mapLocationData');

        if (savedSiteSelected === 'true') {
            setSiteSelected(true);

            if (savedLocationId) {
                setSelectedLocationId(savedLocationId);
            }

            if (savedLocationData) {
                try {
                    setLocationData(JSON.parse(savedLocationData));
                } catch (error) {
                    console.error('Error parsing saved location data:', error);
                }
            }
        }
    }, []);

    // Save site selection state to sessionStorage
    useEffect(() => {
        if (siteSelected) {
            sessionStorage.setItem('mapSiteSelected', 'true');
            if (selectedLocationId) {
                sessionStorage.setItem('mapSelectedLocationId', selectedLocationId);
            }
            if (locationData) {
                sessionStorage.setItem('mapLocationData', JSON.stringify(locationData));
            }
        } else {
            sessionStorage.removeItem('mapSiteSelected');
            sessionStorage.removeItem('mapSelectedLocationId');
            sessionStorage.removeItem('mapLocationData');
        }
    }, [siteSelected, selectedLocationId, locationData]);

    // Handler for text search input
    const handleSearch = useCallback((query: string) => {
        setSearchQuery(query);
        // Clear Wilaya filter and selection when doing a text search
        setSelectedWilaya(null);
        setSelectedLocationId(null);
        setLocationData(null);
    }, []);

    // Handler for Wilaya selection from SearchInput
    const handleWilayaSelect = useCallback((wilaya: string | null) => {
        setSelectedWilaya(wilaya);
        // Clear text search and selection when applying a Wilaya filter
        setSearchQuery('');
        setSelectedLocationId(null);
        setLocationData(null);
    }, []);

    // Handler for map zoom changes
    const handleMapZoom = useCallback((zoom: number) => {
        setZoomLevel(zoom);
    }, []);

    // Handler for clicking a marker on the map
    // Receives data directly from the map component
    const handleLocationClick = useCallback((locationId: string, wilaya: string, status: 'normal' | 'warning' | 'alert') => {
        setSelectedLocationId(locationId); // Set the ID of the clicked marker
        const newLocationData = generateLocationData(locationId, wilaya, status);
        setLocationData(newLocationData); 
        
        // Save the selected location's coordinates to localStorage for the Weather component
        if (newLocationData.latitude && newLocationData.longitude) {
            localStorage.setItem('userLatitude', newLocationData.latitude.toString());
            localStorage.setItem('userLongitude', newLocationData.longitude.toString());
        }
    }, []);

    const handleClearSelection = useCallback(() => {
        setSelectedLocationId(null); 
        setLocationData(null);     
        if (siteSelected) {
            setSiteSelected(false);
            sessionStorage.removeItem('mapSiteSelected');
            sessionStorage.removeItem('mapSelectedLocationId');
            sessionStorage.removeItem('mapLocationData');
        }
    }, [siteSelected]);

    const handleStartSiteSelection = useCallback(() => {
        setSiteSelectionMode(true);
    }, []);

    const handleConfirmSiteSelection = useCallback(() => {
        if (selectedLocationId && locationData) {
            setSiteSelected(true);
            setSiteSelectionMode(false);
        } else {
            alert('Please select a location on the map first.');
        }
    }, [selectedLocationId, locationData]);

    const handleCancelSiteSelection = useCallback(() => {
        setSiteSelectionMode(false);
    }, []);

    return (
        // Main container - adjust padding, background etc. as needed
        <div className="flex flex-col h-full w-full p-3 md:p-4 space-y-3 bg-background text-foreground overflow-hidden">

            {/* Site Selection Controls */}
            <div className="flex-shrink-0 flex justify-between items-center">
                {/* Move the Site Selection Button outside the div that gets disabled */}
                <div className="flex flex-col space-y-2 w-full">
                    {/* Site Selection Button - Now outside the div with pointer-events-none */}
                    <div className="flex-shrink-0">
                        {siteSelectionMode && (
                            <div className="flex space-x-2">
                                <Button
                                    variant="outline"
                                    onClick={handleCancelSiteSelection}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="bg-green-600 hover:bg-green-700 transition-colors"
                                    onClick={handleConfirmSiteSelection}
                                    disabled={!selectedLocationId}
                                >
                                    Confirm Site
                                </Button>
                            </div>
                        )}

                        {siteSelected && (
                            <div className="flex items-center">
                                <span className="inline-flex items-center px-3 py-1 rounded-md bg-green-100 text-green-800 text-sm font-medium mr-2">
                                    <Check className="mr-1 h-4 w-4" />
                                    Site Set
                                </span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleClearSelection}
                                >
                                    Change
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Search Input Component - This still gets disabled appropriately */}
                    <div className={`w-full ${(!siteSelected && !siteSelectionMode) ? 'opacity-50 pointer-events-none' : ''}`}>
                        <SearchInput
                            onSearch={handleSearch}
                            onWilayaSelect={handleWilayaSelect} // Pass the Wilaya handler
                            disabled={!siteSelected && !siteSelectionMode}
                        />
                    </div>
                </div>
            </div>

            <div className="w-full h-full flex flex-col md:flex-row space-x-3 space-y-3 md:space-y-0">


                <div className="flex-shrink-0 w-full lg:w-[25vw]"> 
                    {locationData ? (
                        <InfoContainer data={locationData} onClear={handleClearSelection} />
                    ) : (
                        // Placeholder when no location is selected
                        <Card className={`border w-full lg:w-[25vw] ${isDark ? 'border-neutral-700' : 'border-neutral-300'} bg-card text-card-foreground shadow-sm`}>
                            <CardHeader className="p-3">
                                <CardTitle className="text-sm font-medium">Location Details</CardTitle>
                            </CardHeader>
                            <CardContent className="p-3 text-sm text-muted-foreground">
                                {!siteSelected && !siteSelectionMode ? (
                                    <div className="flex items-center justify-center py-2">
                                        <Lock className="text-neutral-400 mr-2 h-4 w-4" />
                                        <span>Please set a site first to enable all features</span>
                                    </div>
                                ) : siteSelectionMode ? (
                                    "Click a pin on the map to select a site."
                                ) : selectedWilaya ? (
                                    `Filtering by Wilaya: ${selectedWilaya}. Click a pin for details.`
                                ) : (
                                    "Click a pin on the map to view its details or apply a Wilaya filter."
                                )}
                            </CardContent>
                        </Card>
                    )}
                </div>

                <div className="flex-grow w-full min-h-0">
                    <div className="w-full h-full rounded-md overflow-hidden border border-border shadow-md">
                        <AlgeriaMap
                            zoom={zoomLevel}
                            onZoom={handleMapZoom}
                            // @ts-ignore
                            onLocationClick={handleLocationClick} 
                            searchQuery={searchQuery}
                            selectedWilaya={selectedWilaya}       
                            selectedLocationId={selectedLocationId} 
                            selectionMode={siteSelectionMode}    
                        />
                    </div>
                </div>

                {siteSelectionMode && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 pointer-events-none flex items-center justify-center">
                        <div className="bg-white rounded-lg p-4 shadow-lg max-w-md mx-auto text-center pointer-events-auto">
                            <h3 className="text-lg font-medium text-gray-900">Site Selection Mode</h3>
                            <p className="mt-2 text-sm text-gray-500">Click on a location pin to select it as your site.</p>
                            <div className="mt-4 flex justify-center space-x-4">
                                <Button
                                    variant="cancel"
                                    className=" transition-colors"
                                    onClick={handleCancelSiteSelection}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    className="bg-green-600 hover:bg-green-700 transition-colors"
                                    onClick={handleConfirmSiteSelection}
                                    disabled={!selectedLocationId}
                                >
                                    Confirm Site
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

    );
};
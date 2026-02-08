Service Layer Created:
RecipeService — All recipe operations

Get/search recipes by category or query
Scale recipes for different scout counts
Calculate recipe costs
TripService — Meal plan & trip management

CRUD operations for trips
Cost calculations (per scout, per day)
Shopping list aggregation
AuditService — Receipt & budget tracking

Add/retrieve receipts
Calculate budget differences
Generate audit reports with variances
SettingsService — App configuration

Get/update settings
Access target costs, troop name, default scouts
APILayer — Unified microservices API

All public methods prefixed with api_*
Returns JSON-ready data structures
Ready for HTTP endpoints or external clients
Architecture Highlights:
✅ Dependency Injection — Services injected into GrubMasterApp via constructor
✅ Separation of Concerns — Business logic in services, UI in app
✅ Global API Export — window.grubmasterAPI exposes all APIs
✅ Backward Compatible — All existing UI features unchanged
✅ Microservices Ready — Easy to wrap services as HTTP endpoints

Usage Examples (from console/external clients):
All existing functionality persists. The UI now cleanly uses services instead of direct DataStore access.
grubmasterAPI.api_getRecipes()
grubmasterAPI.api_searchRecipes('pancake')
grubmasterAPI.api_getTrips()
grubmasterAPI.api_getAuditReport(tripId)
grubmasterAPI.api_status()

